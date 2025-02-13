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
  @Input() imageUrl: string = 'https://ethic.es/wp-content/uploads/2023/03/imagen.jpg';

}
