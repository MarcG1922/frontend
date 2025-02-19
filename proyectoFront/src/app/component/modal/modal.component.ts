import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { ComentarioMember } from '../../models/response.interface';

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

  public comentarios: ComentarioMember[] = [];

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    // Obtener los comentarios cuando el modal se muestra
    if (this.show) {
      this.loadComentarios();
    }
  }

  onClose() {
    this.closeModal.emit();
    
  }

  onAction() {
    this.actionClick.emit();
    
  }

  public loadComentarios() {
    this.requestService.getComentarios().subscribe({
      next: (response) => {
        this.comentarios = response.member;
      },
      error: (error) => {
        console.error('Error al cargar los comentarios:', error);
      }
    });
  }
}