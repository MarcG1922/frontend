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

  onSave() {
    console.log('Enviando datos editados:', this.editedData);
    this.saveEdit.emit(this.editedData);
  }
} 