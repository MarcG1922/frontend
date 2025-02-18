import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  imports: [ReactiveFormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  public case: string = 'one';

  public onLoginSubmit(): void {
    this.case = 'three';
  }

  public onRegisterSubmit(): void {
    this.case = 'three';
  }

  public goToRegister(): void {
    this.case = 'two';
  }

  public goToLogin(): void {
    this.case = 'one';
  }
}
