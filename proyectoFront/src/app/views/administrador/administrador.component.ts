import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { LoginComponent } from '../../component/login/login.component';
import { RegisterComponent } from '../../component/register/register.component';
import { CardComponent } from '../../component/card/card.component';
import { CardAdminComponent } from '../../component/card-admin/card-admin.component';
import { ModalComponent } from '../../component/modal/modal.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    LoginComponent, 
    RegisterComponent, 
    CardComponent, 
    CardAdminComponent,
    ModalComponent
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})

export class AdministradorComponent {

  public constructor(public service: RequestService) { }

  public case: string = 'one';
  public errorMessage: string = '';
  isLoggedIn : boolean = false;
  public cards: string[] = ["CARGANDO EVENTO", "CARGANDO EVENTO", "CARGANDO EVENTO", "CARGANDO EVENTO", "CARGANDO EVENTO", "CARGANDO EVENTO"];
  public text: string[] = [" ", " ", " ", " ", " ", " "];
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánche"];
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"];
  public competitionsImageUrl: string[] = Array(6).fill('https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif');
  public instructorsImageUrl: string = 'https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg';
  public eventIds: number[] = [];
  public eventDates: string[] = Array(6).fill('Cargando fecha...');
  public eventLocations: string[] = Array(6).fill('Cargando ubicación...');
  public eventTimes: string[] = Array(6).fill('Cargando hora...');

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

  showAddModal: boolean = false;
  showCreateModal: boolean = false;

  ngOnInit() {
    this.isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));
    this.getResponse();
  }

  public getResponse(): void {
    this.service.getEventos().subscribe({
      next: (response) => {
        this.cards = response.member.map(member => member.titulo);
        this.text = response.member.map(member => member.descripcion);
        this.competitionsImageUrl = response.member.map(member => member.imagen);
        this.eventIds = response.member.map(member => member.id);
        this.eventDates = response.member.map(member => new Date(member.fecha).toLocaleDateString());
        this.eventLocations = response.member.map(member => member.ubicacion || 'Sin ubicación');
        this.eventTimes = response.member.map(member => new Date(member.fecha).toLocaleTimeString());
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
      }
    });
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

  onAddEvent() {
    this.showCreateModal = true;
  }

  onSaveNewEvent(eventData: any) {
    const newEvento = {
      titulo: eventData.titulo || "Nuevo Evento",
      descripcion: eventData.descripcion || "Descripción del nuevo evento",
      imagen: eventData.imagen || "https://via.placeholder.com/300",
      fecha: new Date().toISOString(),
      ubicacion: eventData.ubicacion || "Por determinar",
      comentarios: []
    };

    this.service.createEvento(newEvento).subscribe({
      next: (response) => {
        this.showCreateModal = false;
        alert('Evento creado con éxito');
        this.getResponse();
      },
      error: (error) => {
        console.error('Error al crear el evento:', error);
        alert('Error al crear el evento');
      }
    });
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
}
