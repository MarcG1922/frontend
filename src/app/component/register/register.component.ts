import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear objeto de usuario
      const userData = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: btoa(this.registerData.password), // Codificación básica
        createdAt: new Date().toISOString(),
        isLoggedIn: true
      };

      // Guardar en sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      sessionStorage.setItem('isLoggedIn', 'true');

      // Guardar en localStorage para persistencia
      const existingUsers = this.getExistingUsers();
      existingUsers.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Guardar en cookies
      this.cookieService.set('userData', JSON.stringify(userData), 7);
      this.cookieService.set('isLoggedIn', 'true', 7);

      console.log('Datos guardados:', {
        sessionStorage: sessionStorage.getItem('currentUser'),
        localStorage: localStorage.getItem('registeredUsers'),
        cookies: this.cookieService.get('userData')
      });

      alert('Registro exitoso');
      this.router.navigate(['/usuario']);
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. Por favor, intenta de nuevo.');
    }
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
