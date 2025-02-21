import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { ComentarioMember } from '../../models/response.interface';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() cards: string = '';
  @Input() text: string = '';
  @Input() photo: string = 'url(https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg)';
  @Input() comentarios: ComentarioMember[] = [];

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
    console.log("Card con id: " + this.id + "Comentarios: " + this.comentarios[0].comentario);
    console.log("Comentarios: " + this.comentarios);
  }

  onActionClick() {
    console.log('Inscripción solicitada');
  }
}
