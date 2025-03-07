<<<<<<< HEAD
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
=======
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { LoginComponent } from '../../component/login/login.component';
import { RegisterComponent } from '../../component/register/register.component';
import { CardComponent } from '../../component/card/card.component';
import { CardAdminComponent } from '../../component/card-admin/card-admin.component';
import { ModalComponent } from '../../component/modal/modal.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    LoginComponent, 
    RegisterComponent, 
    CardComponent, 
    CardAdminComponent,
    ModalComponent,
    CommonModule,
    FullCalendarModule
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})

export class AdministradorComponent implements OnInit {

  public constructor(
    public service: RequestService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.getResponse();
        }
      }
    );
  }

  public case: string = 'one';
  public errorMessage: string = '';
  isLoggedIn : boolean = false;
  public cards: string[] = [];
  public text: string[] = [];
  public name: string[] = ["Ana García", "Carlos Ruiz", "Laura Martín", "Pedro Sánche"];
  public speed: string[] = ["Patinaje Artístico", "Velocidad", "Iniciacion", "Freestyle"];
  public competitionsImageUrl: string[] = [];
  public instructorsImageUrl: string = 'https://agendadeisa.com/wp-content/uploads/2020/07/clases-patinaje-nin%CC%83os-valencia.jpg';
  public eventIds: number[] = [];
  public eventDates: string[] = [];
  public eventLocations: string[] = [];
  public eventTimes: string[] = [];
  isLoadingEvents: boolean = true;

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
  isLoading: boolean = false;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    events: [],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: 'es',
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    height: 'auto',
    eventBackgroundColor: '#4CAF50',
    eventBorderColor: '#4CAF50',
    eventTextColor: '#fff',
    buttonText: {
      today: 'Hoy'
    },
    firstDay: 1,
    fixedWeekCount: false,
    showNonCurrentDates: false
  };

  selectedEvents: string[] = [];
  showDeleteButton: boolean = false;

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.getResponse();
    }
  }

  public getResponse(): void {
    this.isLoadingEvents = true;
    this.service.getEventos().subscribe({
      next: (response) => {
        this.cards = response.member.map(member => member.titulo);
        this.text = response.member.map(member => member.descripcion);
        this.competitionsImageUrl = response.member.map(member => member.imagen);
        this.eventIds = response.member.map(member => member.id);
        this.eventDates = response.member.map(member => new Date(member.fecha).toLocaleDateString());
        this.eventLocations = response.member.map(member => member.ubicacion || 'Sin ubicación');
        this.eventTimes = response.member.map(member => new Date(member.fecha).toLocaleTimeString());

        // Actualizar eventos del calendario
        const calendarEvents: EventInput[] = response.member.map(event => ({
          id: event.id.toString(),
          title: event.titulo,
          start: new Date(event.fecha),
          end: new Date(event.fecha),
          allDay: true,
          extendedProps: {
            description: event.descripcion,
            location: event.ubicacion || 'Sin ubicación'
          }
        }));

        // Actualizar las opciones del calendario
        this.calendarOptions = {
          ...this.calendarOptions,
          events: calendarEvents
        };
        
        this.isLoadingEvents = false;
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
        this.isLoadingEvents = false;
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
>>>>>>> marc
  }

  public goToRegister(): void {
    this.case = 'two';
  }

  public goToLogin(): void {
    this.case = 'one';
  }
<<<<<<< HEAD
=======

  public logout(): void {
    this.authService.logout();
    this.case = 'one';
    this.cards = [];
    this.text = [];
    this.competitionsImageUrl = [];
    this.eventIds = [];
    this.eventDates = [];
    this.eventLocations = [];
    this.eventTimes = [];
  }

  onAddEvent() {
    this.showCreateModal = true;
  }

  onSaveNewEvent(eventData: any) {
    this.isLoading = true;
    const formattedData = {
      "titulo": eventData.titulo,
      "descripcion": eventData.descripcion,
      "imagen": eventData.imageUrl ? eventData.imageUrl.replace(/^url\(['"]?|['"]?\)$/g, '').trim() : '',
      "fecha": eventData.eventDate || new Date().toISOString(),
      "ubicacion": eventData.eventLocation || '',
      "comentarios": []
    };

    this.service.createEvento(formattedData).subscribe({
      next: (response) => {
        console.log('Evento creado:', response);
        this.showCreateModal = false;
        this.isLoading = false;
        this.getResponse();
      },
      error: (error) => {
        console.error('Error al crear evento:', error);
        this.isLoading = false;
        alert('Error al crear el evento');
      }
    });
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  get stringEventIds(): string[] {
    return this.eventIds.map(id => id.toString());
  }

  handleEventClick(info: any) {
    // Cuando se hace clic en un evento
    const event = info.event;
    alert(`Evento: ${event.title}\nDescripción: ${event.extendedProps.description}\nUbicación: ${event.extendedProps.location}`);
  }

  handleDateSelect(selectInfo: any) {
    // Cuando se selecciona una fecha
    this.showCreateModal = true;
  }

  onEventSelected(event: {id: string, selected: boolean}) {
    if (event.selected) {
      this.selectedEvents.push(event.id);
    } else {
      this.selectedEvents = this.selectedEvents.filter(id => id !== event.id);
    }
    this.showDeleteButton = this.selectedEvents.length > 0;
  }

  deleteSelectedEvents() {
    if (confirm(`¿Estás seguro de que deseas eliminar ${this.selectedEvents.length} eventos?`)) {
      const deletePromises = this.selectedEvents.map(id => 
        this.service.deleteEvento(parseInt(id)).toPromise()
      );

      Promise.all(deletePromises)
        .then(() => {
          alert('Eventos eliminados correctamente');
          this.selectedEvents = [];
          this.showDeleteButton = false;
          this.getResponse(); // Actualizar la lista de eventos
        })
        .catch(error => {
          console.error('Error al eliminar eventos:', error);
          alert('Error al eliminar algunos eventos');
        });
    }
  }
>>>>>>> marc
}
