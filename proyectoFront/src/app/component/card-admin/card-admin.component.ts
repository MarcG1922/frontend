import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-card-admin',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.css']
})
export class CardAdminComponent {
  @Input() cards: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() eventoId: number = 0;

  showModal: boolean = false;

  constructor(private requestService: RequestService) {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.requestService.deleteEvento(this.eventoId).subscribe({
        next: () => {
          alert('Evento eliminado con éxito');
          window.location.reload(); // Recarga la página para actualizar la lista
        },
        error: (error) => {
          console.error('Error al eliminar el evento:', error);
          alert('Error al eliminar el evento');
        }
      });
    }
  }
}
