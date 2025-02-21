import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  constructor(private router: Router) {}
  user: any = {}; // Objeto para almacenar la información del usuario

  ngOnInit() {
    const storedUser = sessionStorage.getItem('currentUser');

    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser); // Convertir JSON a objeto
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
      }
    }
  }

  logout() {  
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('userData'); 
    sessionStorage.clear();
  
  
    this.router.navigate(['/login']);
  }
}
