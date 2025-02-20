import { Component } from '@angular/core';
import { JumbotronComponent } from '../../component/jumbotron/jumbotron.component';
import { FormComponent } from '../../component/form/form.component';
import { InstructoresComponent } from '../../component/instructores/instructores.component';
import { CardComponent } from '../../component/card/card.component';
import { CalendarioComponent } from '../../component/calendario/calendario.component';
import { RequestService } from '../../services/request.service';
import { InfoComponent } from '../../component/info/info.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    JumbotronComponent, 
    FormComponent, 
    InstructoresComponent, 
    CardComponent, 
    CalendarioComponent,
    InfoComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  public cards: string[] = [];
  public text: string[] = [];
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánche"];
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"];
  public competitionsImageUrl: string[] = [];
  public instructorsImageUrl: string = 'https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg';
  public isLoadingEvents: boolean = true;

  public constructor(public service: RequestService) { }

  public getResponse(): void {
    this.isLoadingEvents = true;
    this.service.getEventos().subscribe({
      next: (response) => {
        this.cards = response.member.map((member) => member.titulo);
        this.text = response.member.map((member) => member.descripcion);
        this.competitionsImageUrl = response.member.map((member) => member.imagen);
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

}
