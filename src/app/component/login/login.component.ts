import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLoginSubmit() {
    console.log('Login attempt:', { email: this.email, password: this.password });
    // Aquí iría la lógica de autenticación
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
