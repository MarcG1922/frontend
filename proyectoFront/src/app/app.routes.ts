import { Routes } from '@angular/router';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { AdministradorComponent } from './views/administrador/administrador.component';
import { SocioComponent } from './views/socio/socio.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'socio', component: SocioComponent },
    { path: 'admin', component: AdministradorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
];
