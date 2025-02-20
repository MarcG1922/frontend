import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class ModalComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';
  @Input() eventTime: string = '';
  @Input() eventId: number = 0; // Recibimos la ID del evento

  @Output() closeModal = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  public comentarios: ComentarioMember[] = [];

  constructor(private service: RequestService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      this.loadComentarios();
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  onAction() {
    this.actionClick.emit();
  }

  public loadComentarios(): void {
    if (!this.eventId) return;
  
    // Limpiar comentarios antes de solicitar los nuevos
    this.comentarios = [];
  
    this.service.getComentariosByEventoId(this.eventId.toString()).subscribe((response) => {
      if (this.eventId) { // Asegurarse de que el eventId no ha cambiado mientras se cargaban
        this.comentarios = response.member;
      }
    });
  }

  trackByComentarioId(index: number, comentario: ComentarioMember): string {
    return comentario.id.toString();
  }
  
  
}
