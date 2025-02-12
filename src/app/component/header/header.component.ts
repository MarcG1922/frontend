import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    @Input() photo: string = 'https://www.manises.es/sites/www.manises.es/files/images/ayto/deportes/clubs/patinaje.jpg';

}
