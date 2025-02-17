import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../../models/response.interface';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-administrador',
  imports: [ReactiveFormsModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  public case: string = 'one';
  public errorMessage: string = '';

  public constructor(public service: RequestService) { }

  public loginForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  public registerForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  public onLoginSubmit(): void {
    this.service.getUsuarios().subscribe({
      next: (response) => {
        if (this.loginForm.valid && response.member[0].nombre === this.loginForm.getRawValue().name && response.member[0].contrasenya === this.loginForm.getRawValue().password) {
          console.log('Datos de inicio de sesión:', { name: this.loginForm.getRawValue().name, password: this.loginForm.getRawValue().password });
          this.case = 'three';
        } else {
          alert('Por favor, completa todos los campos requeridos.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.errorMessage = 'Hubo un error al obtener los usuarios. Por favor, intenta de nuevo.';
      }
    });
  }

  public onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, phone, password } = this.registerForm.getRawValue();

      const phoneNumber = parseInt(phone, 10);

      if (isNaN(phoneNumber)) {
        this.errorMessage = 'El número de teléfono debe ser un valor numérico válido.';
        return;
      }

      console.log('Datos de registro:', { name, email, phoneNumber, password });

      this.service.registerUsuario({
        name,
        email,
        phone: phoneNumber,
        password
      }).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          this.case = 'three';
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          this.errorMessage = 'Hubo un error al registrar el usuario. Por favor, intenta de nuevo.';
        }
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }


  public goToRegister(): void {
    this.case = 'two';
  }

  public goToLogin(): void {
    this.case = 'one';
  }
}