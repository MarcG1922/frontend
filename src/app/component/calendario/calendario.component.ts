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

  events: CalendarEvent[] = [
    {
      title: 'Clase de Patinaje Nivel 1',
      start: new Date(new Date().setHours(10, 0)),
      end: new Date(new Date().setHours(11, 30)),
      color: { primary: '#ad2121', secondary: '#FAE3E3' }
    },
    {
      title: 'Clase de Patinaje Nivel 2',
      start: new Date(new Date().setHours(14, 0)),
      end: new Date(new Date().setHours(15, 30)),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' }
    },
    {
      title: 'Entrenamiento Avanzado',
      start: new Date(new Date().setHours(16, 0)),
      end: new Date(new Date().setHours(17, 30)),
      color: { primary: '#28a745', secondary: '#DFF0D8' }
    }
  ];

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEventClick(event: { event: CalendarEvent }): void {
    console.log('Evento seleccionado:', event.event.title);
  }

  handleTimeClick(event: { date: Date }): void {
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