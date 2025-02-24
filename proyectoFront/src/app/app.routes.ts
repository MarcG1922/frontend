import { Routes } from '@angular/router';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { AdministradorComponent } from './views/administrador/administrador.component';
import { SocioComponent } from './views/socio/socio.component';
<<<<<<< HEAD
=======
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { PerfilComponent } from './views/perfil/perfil.component';
>>>>>>> marc

export const routes: Routes = [
    { path: '', redirectTo: 'usuario', pathMatch: 'full' },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'socio', component: SocioComponent },
<<<<<<< HEAD
    { path: 'admin', component: AdministradorComponent }
=======
    { path: 'admin', component: AdministradorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'perfil', component: PerfilComponent },
    
>>>>>>> marc
];
