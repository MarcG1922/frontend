import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() eventoId: string = '';
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';
  @Input() eventTime: string = '';

  @Output() deleteEvent = new EventEmitter<string>();
  
  showModal = false;
  isLoading = false;

  constructor(private requestService: RequestService) {}

  onDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      const eventoIdNumber = parseInt(this.eventoId);
      this.requestService.deleteEvento(eventoIdNumber).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert(`Error al eliminar: ${error.message}`);
        }
      });
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onSaveEdit(editedData: any) {
    const formattedData = {
      "titulo": editedData.titulo || this.cards,
      "descripcion": editedData.descripcion || this.text,
      "imagen": editedData.photo || this.photo,
      "fecha": new Date().toISOString(),
      "ubicacion": editedData.ubicacion || this.eventLocation,
      "comentarios": []
    };

    const eventoIdNumber = parseInt(this.eventoId);

    this.requestService.updateEvento(eventoIdNumber, formattedData).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response);
        this.showModal = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error detallado:', error);
        alert(`Error al actualizar: ${error.status} - ${error.message}`);
      }
    });
  }

  private formatImageUrl(image: string): string {
    if (!image) return '';
    return image.replace('url(', '').replace(')', '') || 'string';
  }
}