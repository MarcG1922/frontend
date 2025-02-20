import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instructores',
  imports: [],
  templateUrl: './instructores.component.html',
  styleUrl: './instructores.component.css'
})
export class InstructoresComponent {

  @Input() name: string = 'Carlos Ruiz';
  @Input() speed: string = 'Velocidad';
  @Input() imageUrl: string = '';

}
