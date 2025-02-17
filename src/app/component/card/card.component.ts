import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() cards: string = '';
  @Input() text: string = '';
  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onActionClick() {
    console.log('Inscripción solicitada');
    // Aquí iría la lógica de inscripción
  }
}
