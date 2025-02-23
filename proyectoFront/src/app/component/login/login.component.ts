import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private router = inject(Router);
  private requestService = inject(RequestService);
  private authService = inject(AuthService);

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
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.authService.login();
          
          if (user.admin) {
            this.router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/usuario']).then(() => {
              window.location.reload();
            });
          }
        } else {
          alert('Correo o contraseña incorrectos');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
      }
    });
  }
}
