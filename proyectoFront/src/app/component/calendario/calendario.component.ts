import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario',
  imports: [NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  today = inject(NgbCalendar).getToday();

  model: NgbDateStruct = { year: 2025, month: 2, day: 12 };
  date: NgbDateStruct = { year: 2025, month: 2, day: 12 };

  selectToday() {
    this.model = { ...this.today };
  }

  onNavigate(event: any) {
    console.log('Navigate event:', event);
    this.date = event.next;
  }
}
