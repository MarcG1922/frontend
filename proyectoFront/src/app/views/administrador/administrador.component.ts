import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { LoginComponent } from '../../component/login/login.component';
import { RegisterComponent } from '../../component/register/register.component';

@Component({
  selector: 'app-administrador',
  imports: [ReactiveFormsModule, LoginComponent, RegisterComponent],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})

export class AdministradorComponent {

  public constructor(public service: RequestService) { }

  public case: string = 'one';
  public errorMessage: string = '';
  isLoggedIn : boolean = false;

  public loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  public registerForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });
  ngOnInit() {
    this.isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));
    console.log();  
   }
  public onLoginSubmit(): void {
    this.service.getUsuarios().subscribe({
      next: (response) => {
        const { email, password } = this.loginForm.getRawValue();

        if (this.loginForm.valid && response.member.some(user => user.email === email && user.contrasenya === password)) {
          console.log('Datos de inicio de sesión:', { email, password });
          this.case = 'three';
        } else {
          alert('Correo o contraseña incorrectos.');
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

      this.service.getUsuarios().subscribe({
        next: (response) => {
          const emailExists = response.member.some(user => user.email === email);

          if (emailExists) {
            alert('Este correo ya está registrado. Usa otro o inicia sesión.');
            return;
          }

          this.service.registerUsuario({
            name,
            email,
            phone: phoneNumber,
            password
          }).subscribe({
            next: (res) => {
              console.log('Usuario registrado con éxito:', res);
              this.case = 'three';
            },
            error: (err) => {
              console.error('Error al registrar usuario:', err);
              this.errorMessage = 'Hubo un error al registrar el usuario. Por favor, intenta de nuevo.';
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener los usuarios:', error);
          this.errorMessage = 'Hubo un error al comprobar el correo. Por favor, intenta de nuevo.';
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
