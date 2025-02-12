import { Component } from '@angular/core';
import { JumbotronComponent } from '../../component/jumbotron/jumbotron.component';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { FormComponent } from '../../component/form/form.component';
import { InstructoresComponent } from '../../component/instructores/instructores.component';
import { CardComponent } from '../../component/card/card.component';

@Component({
  selector: 'app-usuario',
  imports: [JumbotronComponent, FormComponent, InstructoresComponent, CardComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  public cards: string[] = ["Campeonato autonómico", "Sesión de perfeccionamiento", "Trofeo Navideño Piruetes", "Festival de fin de curso", "Trofeo de Manises", "Trofeo Somnis Sobre Rodes"]
  public text: string[] = ["Descripción 1", "Descripción 2", "Descripción 3", "Descripción 4", "Descripción 5", "Descripción 6"]
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánche"]
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"]
  public imageUrl: string = "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg"

}
