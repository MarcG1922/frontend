import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private requestService = inject(RequestService);

  loginData = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.requestService.getUsuarios().subscribe({
      next: (response) => {
        const user = response.member.find(
          u => u.email === this.loginData.email && u.contrasenya === this.loginData.password
        );

        if (user) {
          // Guardar datos en sessionStorage
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          sessionStorage.setItem('isLoggedIn', 'true');
          
          // Guardar en cookies
          this.cookieService.set('userData', JSON.stringify(user), 7);
          this.cookieService.set('isLoggedIn', 'true', 7);
          
          alert('Inicio de sesión exitoso');

          // Redirigir según el rol del usuario
          if (user.admin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/usuario']);
          }
        } else {
          alert('Correo o contraseña incorrectos');
        }
      },
      error: (error) => {
        console.error('Error al verificar credenciales:', error);
        alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
      }
    });
  }
}
