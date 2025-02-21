import { Component } from '@angular/core';
import { JumbotronComponent } from '../../component/jumbotron/jumbotron.component';
import { FormComponent } from '../../component/form/form.component';
import { InstructoresComponent } from '../../component/instructores/instructores.component';
import { CardComponent } from '../../component/card/card.component';
import { CalendarioComponent } from '../../component/calendario/calendario.component';
import { RequestService } from '../../services/request.service';
import { InfoComponent } from '../../component/info/info.component';
import { ComentarioMember } from '../../models/response.interface';

@Component({
  selector: 'app-usuario',
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
  public competitionsImageUrl: string[] = ['https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg'];
  public instructorsImageUrl: string = 'https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg';
  public cardsId: number[] = [];
  public comments: { [key: number]: ComentarioMember[] } = {};

  public constructor(public service: RequestService) { }

  public getResponse(): void {
    this.service.getEventos().subscribe((response) => {
      this.cards = response.member.map((member) => member.titulo);
      this.text = response.member.map((member) => member.descripcion);
      this.competitionsImageUrl = response.member.map((member) => member.imagen);
      this.cardsId = response.member.map((member) =>
        parseInt(member['@id'].split('/').pop() || "0", 10)
      );

      this.cardsId.forEach((id) => {
        this.service.getComentariosByEventoId(id.toString()).subscribe((response) => {
          this.comments[id] = response.member;
          console.log("Comentarios 0: " + this.comments + " Id: " + id);
        });
      });
    });


  }


  public ngOnInit(): void {
    this.getResponse();
  }

}
