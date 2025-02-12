import { Component } from '@angular/core';
import { JumbotronComponent } from '../../component/jumbotron/jumbotron.component';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { FormComponent } from '../../component/form/form.component';

@Component({
  selector: 'app-administrador',
  imports: [JumbotronComponent, CalendarComponent, FormComponent],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

}
