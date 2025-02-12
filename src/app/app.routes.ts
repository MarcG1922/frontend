import { Routes } from '@angular/router';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { AdministradorComponent } from './views/administrador/administrador.component';
import { SocioComponent } from './views/socio/socio.component';

export const routes: Routes = [
    { path: '', redirectTo: 'usuario', pathMatch: 'full' },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'socio', component: SocioComponent },
    { path: 'admin', component: AdministradorComponent }
];
