import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="show">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Editar Evento' : 'Crear Nuevo Evento' }}</h2>
        <form (submit)="onSubmit($event)">
          <div class="form-group">
            <label>Título:</label>
            <input type="text" [(ngModel)]="formData.titulo" name="titulo" required>
          </div>
          <div class="form-group">
            <label>Descripción:</label>
            <textarea [(ngModel)]="formData.descripcion" name="descripcion" required></textarea>
          </div>
          <div class="form-group">
            <label>Imagen:</label>
            <input type="file" (change)="onFileSelected($event)" accept="image/*">
            <div *ngIf="previewUrl" class="image-preview">
              <img [src]="previewUrl" alt="Preview">
            </div>
          </div>
          <div class="form-group">
            <label>Fecha:</label>
            <input type="date" [(ngModel)]="formData.fecha" name="fecha" required>
          </div>
          <div class="form-group">
            <label>Hora:</label>
            <input type="time" [(ngModel)]="formData.hora" name="hora" required>
          </div>
          <div class="form-group">
            <label>Ubicación:</label>
            <input type="text" [(ngModel)]="formData.ubicacion" name="ubicacion" required>
          </div>
          <div class="modal-buttons">
            <button type="button" (click)="onClose()">Cancelar</button>
            <button type="submit" [disabled]="isLoading">
              {{ isLoading ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() isEditing: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';
  @Input() eventTime: string = '';
  @Input() isLoading: boolean = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<any>();

  formData: any = {
    titulo: '',
    descripcion: '',
    imagen: '',
    fecha: '',
    hora: '',
    ubicacion: ''
  };

  previewUrl: string | null = null;
  selectedFile: File | null = null;

  ngOnInit() {
    if (this.isEditing) {
      this.formData = {
        titulo: this.title,
        descripcion: this.description,
        imagen: this.imageUrl,
        fecha: this.eventDate,
        hora: this.eventTime,
        ubicacion: this.eventLocation
      };
      this.previewUrl = this.imageUrl;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    
    let imageUrl = this.formData.imagen;
    
    if (this.selectedFile) {
      try {
        imageUrl = await this.convertFileToBase64(this.selectedFile);
      } catch (error) {
        console.error('Error al convertir la imagen:', error);
        alert('Error al procesar la imagen');
        return;
      }
    }

    const editedData = {
      titulo: this.formData.titulo,
      descripcion: this.formData.descripcion,
      imageUrl: imageUrl,
      eventDate: this.formData.fecha,
      eventLocation: this.formData.ubicacion,
      eventTime: this.formData.hora
    };

    this.saveEdit.emit(editedData);
  }

  onClose() {
    this.closeModal.emit();
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
} 