import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CalendarEvent,
  CalendarView,
  CalendarModule,
  CalendarWeekViewComponent,
  CalendarMonthViewComponent
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { EventoMember } from '../../models/response.interface';

interface CalendarDayViewEvent {
  day: {
    date: Date;
  };
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarioComponent {
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];

  constructor(private requestService: RequestService) {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.requestService.getEventos().subscribe({
      next: (response) => {
        this.events = response.member.map(evento => this.transformEventoToCalendarEvent(evento));
        this.refresh.next();
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
      }
    });
  }

  private transformEventoToCalendarEvent(evento: EventoMember): CalendarEvent {
    return {
      start: new Date(evento.fecha),
      title: evento.titulo,
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      meta: {
        descripcion: evento.descripcion,
        imagen: evento.imagen
      }
    };
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEventClick({ event }: { event: CalendarEvent }): void {
    console.log('Evento seleccionado:', event);
    alert(`
      Evento: ${event.title}
      Descripción: ${event.meta.descripcion}
    `);
  }

  handleTimeClick(event: any): void {
    console.log('Hora seleccionada:', event.date);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Día seleccionado:', date);
    if (events.length > 0) {
      console.log('Eventos en este día:', events);
    }
  }

  previousView(): void {
    const date = new Date(this.viewDate);
    if (this.view === CalendarView.Month) {
      date.setMonth(date.getMonth() - 1);
    } else if (this.view === CalendarView.Week) {
      date.setDate(date.getDate() - 7);
    }
    this.viewDate = date;
  }

  nextView(): void {
    const date = new Date(this.viewDate);
    if (this.view === CalendarView.Month) {
      date.setMonth(date.getMonth() + 1);
    } else if (this.view === CalendarView.Week) {
      date.setDate(date.getDate() + 7);
    }
    this.viewDate = date;
  }

  today(): void {
    this.viewDate = new Date();
  }
}