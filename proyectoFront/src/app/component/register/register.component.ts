import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private requestService = inject(RequestService);

  registerData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.requestService.getUsuarios().subscribe({
      next: (response) => {
        const emailExists = response.member.some(user => user.email === this.registerData.email);
        
        if (emailExists) {
          alert('Este correo ya está registrado. Por favor, usa otro o inicia sesión.');
          return;
        }

        const phoneNumber = parseInt(this.registerData.phone, 10);
        
        if (isNaN(phoneNumber)) {
          alert('El número de teléfono debe ser un valor numérico válido.');
          return;
        }

        this.requestService.registerUsuario({
          name: this.registerData.name,
          email: this.registerData.email,
          phone: phoneNumber,
          password: this.registerData.password
        }).subscribe({
          next: (response) => {
            // Guardar datos en sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(response));
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Guardar en cookies
            this.cookieService.set('userData', JSON.stringify(response), 7);
            this.cookieService.set('isLoggedIn', 'true', 7);
            
            alert('Registro exitoso');
            
            // Recargar la página para actualizar el estado
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario. Por favor, intenta de nuevo.');
          }
        });
      },
      error: (error) => {
        console.error('Error al verificar el correo:', error);
        alert('Error al verificar el correo. Por favor, intenta de nuevo.');
      }
    });
  }

  private getExistingUsers(): any[] {
    const usersStr = localStorage.getItem('registeredUsers');
    try {
      return usersStr ? JSON.parse(usersStr) : [];
    } catch {
      return [];
    }
  }

  isUserRegistered(email: string): boolean {
    const existingUsers = this.getExistingUsers();
    return existingUsers.some(user => user.email === email);
  }

  // Método para verificar si los datos se guardaron correctamente
  checkStoredData(): void {
    console.log('SessionStorage:', {
      currentUser: sessionStorage.getItem('currentUser'),
      isLoggedIn: sessionStorage.getItem('isLoggedIn')
    });
    
    console.log('LocalStorage:', {
      registeredUsers: localStorage.getItem('registeredUsers')
    });
    
    console.log('Cookies:', {
      userData: this.cookieService.get('userData'),
      isLoggedIn: this.cookieService.get('isLoggedIn')
    });
  }

  // Método para limpiar todos los datos almacenados
  clearAllStoredData(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
    console.log('Todos los datos han sido limpiados');
  }
}
