<<<<<<< HEAD
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    @Input() photo: string = 'https://www.manises.es/sites/www.manises.es/files/images/ayto/deportes/clubs/patinaje.jpg';
=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  isMenuOpen = false;
  logoPath = 'patinaje.jpg'; 
  isLoggedIn : boolean = false;
  userName : string = "";
  admin : boolean = false;
  

  // Método para alternar el menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
   this.isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));
   console.log();  
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  
    // Obtener los datos del usuario desde sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
  
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser); // Convertir el JSON a objeto
        this.userName = user.nombre; // Guardar el nombre en la variable
        this.admin = user.admin; // Guardar el nombre en la variable
        console.log(this.admin)
        console.log(user)
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
      }
    }
  }
  

logout() {
  this.isDropdownOpen = false;

  localStorage.removeItem('userToken'); 
  localStorage.removeItem('userData'); 
  sessionStorage.clear();

  this.isLoggedIn = false;

  this.router.navigate(['/login']);
}

close() {
   this.isDropdownOpen = false;
}
>>>>>>> marc

}
