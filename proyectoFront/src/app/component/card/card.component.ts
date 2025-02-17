import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cards: string = "";
  @Input() text: string = "";
  @Input() photo: string = 'url(https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg)';

}
