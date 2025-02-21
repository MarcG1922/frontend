import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentarios, Eventos, UsuarioMember } from '../models/response.interface';
import { Usuarios } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public apiUrl = 'http://localhost:8000/api/usuarios';
  public comentariosUrl = 'http://localhost:8000/api/comentarios';

  constructor(public http: HttpClient) { }

  public getEventos(): Observable<Eventos> {
    return this.http.get<Eventos>('http://localhost:8000/api/eventos');
  }

  public getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>('http://localhost:8000/api/usuarios');
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

  public getComentarios(): Observable<Comentarios> {
    return this.http.get<Comentarios>(this.comentariosUrl);
  }

  public getComentariosByEventoId(eventoId: string): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${this.comentariosUrl}?eventoId=${eventoId}`);
  }

  public createComentario(comentarioData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
    });

    const body = {
      comentario: comentarioData.comentario,
      usuario: comentarioData.usuario,
      evento: comentarioData.evento,
      fecha: comentarioData.fecha,
    };

    return this.http.post(this.comentariosUrl, body, { headers });
  }
}
