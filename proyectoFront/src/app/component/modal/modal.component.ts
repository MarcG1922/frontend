import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';
  @Input() eventTime: string = '';
  @Input() isEditing: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() initialData: any;
  
  editedData = {
    titulo: '',
    descripcion: '',
    imagen: '',
    fecha: '',
    ubicacion: '',
    hora: ''
  };
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<any>();
  formSubmitted = false;

  onSave() {
    this.formSubmitted = true; // Marcar el formulario como enviado

    // Verificar si todos los campos están llenos
    if (
      this.editedData.titulo &&
      this.editedData.descripcion &&
      this.editedData.imagen &&
      this.editedData.fecha &&
      this.editedData.ubicacion &&
      this.editedData.hora
    ) {
      // Si todos los campos están llenos, proceder a guardar los cambios
      console.log('Datos guardados:', this.editedData);
      console.log(this.editedData.imagen)
      this.saveEdit.emit(this.editedData);
      // Aquí podrías agregar la lógica para guardar los datos en tu backend o realizar otras acciones
    } else {
      console.log('Por favor, rellena todos los campos.');
    }
}


  ngOnInit() {
    if (this.initialData) {
      this.editedData = { ...this.initialData };
    } else {
      this.editedData = {
        titulo: this.title,
        descripcion: this.description,
        imagen: this.imageUrl,
        fecha: this.eventDate,
        ubicacion: this.eventLocation,
        hora: this.eventTime
      };
    }
  }

  onClose() {
    this.closeModal.emit();
  }
} 