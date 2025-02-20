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
  @Input() eventoId: number = 0;
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';
  @Input() eventTime: string = '';

  @Output() eventUpdated = new EventEmitter<void>();

  showModal: boolean = false;
  isEditing: boolean = false;

  constructor(private requestService: RequestService) {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onEdit() {
    this.isEditing = true;
    this.toggleModal();
  }

  onSaveEdit(editedData: any) {
    const formattedData = {
      "titulo": editedData.titulo || this.cards,
      "descripcion": editedData.descripcion || this.text,
      "imagen": this.formatImageUrl(editedData.imagen) || this.formatImageUrl(this.photo),
      "fecha": new Date().toISOString(),
      "ubicacion": editedData.ubicacion || this.eventLocation,
      "comentarios": []
    };

    console.log('Datos a enviar:', formattedData);

    this.requestService.updateEvento(this.eventoId, formattedData).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response);
        this.showModal = false;
        this.isEditing = false;
        alert('Evento actualizado con éxito');
        window.location.reload(); // Forzar recarga para ver los cambios
      },
      error: (error) => {
        console.error('Error detallado:', error);
        alert(`Error al actualizar: ${error.status} - ${error.message}`);
      }
    });
  }

  onDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.requestService.deleteEvento(this.eventoId).subscribe({
        next: () => {
          alert('Evento eliminado con éxito');
          this.eventUpdated.emit();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert(`Error al eliminar: ${error.message}`);
        }
      });
    }
  }

  private formatImageUrl(image: string): string {
    if (!image) return '';
    return image.replace('url(', '').replace(')', '') || 'string';
  }
}