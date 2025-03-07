<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> marc
import { JumbotronComponent } from '../../component/jumbotron/jumbotron.component';
import { FormComponent } from '../../component/form/form.component';
import { InstructoresComponent } from '../../component/instructores/instructores.component';
import { CardComponent } from '../../component/card/card.component';
<<<<<<< HEAD
import { CalendarioComponent } from '../../component/calendario/calendario.component';
import { HorarioComponent } from '../../component/horario/horario.component';

@Component({
  selector: 'app-usuario',
  imports: [JumbotronComponent, FormComponent, InstructoresComponent, CardComponent, CalendarioComponent, HorarioComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  public cards: string[] = ["Campeonato autonómico", "Sesión de perfeccionamiento", "Trofeo Navideño Piruetes", "Festival de fin de curso", "Trofeo de Manises", "Trofeo Somnis Sobre Rodes"]
  public text: string[] = ["Descripción 1", "Descripción 2", "Descripción 3", "Descripción 4", "Descripción 5", "Descripción 6"]
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánche"]
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"]
  public imageUrl: string = "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg"
=======
import { InfoComponent } from '../../component/info/info.component';
import { RequestService } from '../../services/request.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    JumbotronComponent, 
    FormComponent, 
    InstructoresComponent, 
    CardComponent,
    InfoComponent,
    FullCalendarModule,
    CommonModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  public cards: string[] = [];
  public text: string[] = [];
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánchez"];
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"];
  public competitionsImageUrl: string[] = [];
  public instructorsImageUrl: string = 'https://ethic.es/wp-content/uploads/2023/03/imagen.jpg';
  public eventDates: string[] = [];
  public eventLocations: string[] = [];
  public eventTimes: string[] = [];
  public isLoadingEvents: boolean = true;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next'
    },
    height: 'auto',
    eventDisplay: 'block',
    displayEventTime: true,
    eventBackgroundColor: '#4e00c4',
    eventBorderColor: '#4e00c4',
    eventTextColor: '#ffffff',
    dayCellClassNames: 'calendar-day',
    dayHeaderClassNames: 'calendar-header',
    titleFormat: { year: 'numeric', month: 'long' },
    buttonText: {
      today: 'Hoy'
    },
    firstDay: 1
  };

  constructor(private service: RequestService) { }

  public getResponse(): void {
    this.isLoadingEvents = true;
    this.service.getEventos().subscribe({
      next: (response) => {
        this.cards = response.member.map((member) => member.titulo);
        this.text = response.member.map((member) => member.descripcion);
        this.competitionsImageUrl = response.member.map((member) => member.imagen);
        this.eventDates = response.member.map((member) => new Date(member.fecha).toLocaleDateString());
        this.eventLocations = response.member.map((member) => member.ubicacion || 'Sin ubicación');
        this.eventTimes = response.member.map((member) => new Date(member.fecha).toLocaleTimeString());

        // Añadir eventos al calendario
        const calendarEvents = response.member.map(event => ({
          title: event.titulo,
          start: new Date(event.fecha),
          end: new Date(event.fecha),
          allDay: true
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: calendarEvents
        };

        this.isLoadingEvents = false;
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
        this.isLoadingEvents = false;
      }
    });
  }

  public ngOnInit(): void {
    this.getResponse();
  }
>>>>>>> marc

}
