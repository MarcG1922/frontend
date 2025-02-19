import { Component } from '@angular/core';
import { JumbotronComponent } from '../../component/jumbotron/jumbotron.component';
import { FormComponent } from '../../component/form/form.component';
import { InstructoresComponent } from '../../component/instructores/instructores.component';
import { CardComponent } from '../../component/card/card.component';
import { CalendarioComponent } from '../../component/calendario/calendario.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-usuario',
  imports: [
    JumbotronComponent, 
    FormComponent, 
    InstructoresComponent, 
    CardComponent, 
    CalendarioComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  public cards: string[] = ["Campeonato autonómico", "Sesión de perfeccionamiento", "Trofeo Navideño Piruetes", "Festival de fin de curso", "Trofeo de Manises", "Trofeo Somnis Sobre Rodes"];
  public text: string[] = ["Descripción 1", "Descripción 2", "Descripción 3", "Descripción 4", "Descripción 5", "Descripción 6"];
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánche"];
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"];
  public competitionsImageUrl: string[] = ['https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg'];
  public instructorsImageUrl: string = 'https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg';

  public constructor(public service: RequestService) { }

  public getResponse(): void {
    this.service.getEventos().subscribe((response) => {
      this.cards = response.member.map((member) => member.titulo);
      this.text = response.member.map((member) => member.descripcion);
      this.competitionsImageUrl = response.member.map((member) => member.imagen);
    });
  }

  public ngOnInit(): void {
    this.getResponse();
  }

}
