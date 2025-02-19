import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos, UsuarioMember } from '../models/response.interface';
import { Usuarios } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public apiUrl = 'http://54.85.126.45/api/usuarios';

  constructor(public http: HttpClient) { }

  public getEventos(): Observable<Eventos> {
    return this.http.get<Eventos>('http://54.85.126.45/api/eventos');
  }

  public getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>('http://54.85.126.45/api/usuarios');
  }

  public registerUsuario(userData: { name: string; email: string; phone: number; password: string }): Observable<UsuarioMember> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
    });

    const body = {
      nombre: userData.name,
      email: userData.email,
      telefono: userData.phone,
      contrasenya: userData.password,
      admin: false,
      comentarios: []
    };

    return this.http.post<UsuarioMember>(this.apiUrl, body, { headers });
  }

}
