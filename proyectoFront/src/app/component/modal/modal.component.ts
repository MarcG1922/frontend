import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { ComentarioMember } from '../../models/response.interface';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  @Input() eventId: number = 0;
  @Input() comentarios: ComentarioMember[] = [];

  @Output() closeModal = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  isCreatingComment: boolean = false;
  newCommentControl: FormControl = new FormControl('');

  constructor(private service: RequestService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      this.loadComentarios();
    }
  }

  public onClose(): void {
    this.closeModal.emit();
  }

  public onAction(): void {
    this.actionClick.emit();
  }

  public loadComentarios(): void {
    if (!this.eventId) return;

    this.service.getComentariosByEventoId(this.eventId.toString()).subscribe((response) => {
      if (this.eventId) {
        this.comentarios = response.member;
      }
    });
  }

  public trackByComentarioId(index: number, comentario: ComentarioMember): string {
    return comentario.id.toString();
  }

  public toggleCreateComment(): void {
    this.isCreatingComment = !this.isCreatingComment;
  }

  public submitComment() {
    const newComentario = this.newCommentControl.value.trim();
  
    if (newComentario === '') {
      return;
    }
  
    const comentarioData = {
      comentario: newComentario,
      usuario: 'http://localhost:8000/api/usuarios/1',
      evento: `http://localhost:8000/api/eventos/${this.eventId}`,
      fecha: new Date().toISOString(),
    };
  
    console.log('Comentario a enviar:', comentarioData);
  
    this.service.createComentario(comentarioData).subscribe(
      (response) => {
        this.loadComentarios();
        this.newCommentControl.reset();
        this.isCreatingComment = false;
      },
      (error) => {
        console.error('Error al crear el comentario: ', error);
      }
    );
  }
  
}