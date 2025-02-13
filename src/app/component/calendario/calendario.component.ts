import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek', // Muestra la vista semanal
    plugins: [dayGridPlugin], // Plugin para vista de cuadrícula
    selectable: true // Permite seleccionar días/semanas
  };

  handleDateClick(arg: any) {
    alert(`Fecha seleccionada: ${arg.dateStr}`);
  }
}
