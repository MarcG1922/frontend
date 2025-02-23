import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { RequestService } from '../../services/request.service';
import { EventoMember } from '../../models/response.interface';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    }
  };

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.requestService.getEventos().subscribe({
      next: (response) => {
        this.calendarOptions.events = response.member.map(evento => ({
          title: evento.titulo,
          date: new Date(evento.fecha).toISOString().split('T')[0]
        }));
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
      }
    });
  }
}