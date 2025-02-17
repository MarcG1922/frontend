import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';
  @Input() eventTime: string = '';
  @Input() actionButtonText: string = 'Inscribirse';
  @Input() cancelButtonText: string = 'Cerrar';
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onAction() {
    this.actionClick.emit();
  }
} 