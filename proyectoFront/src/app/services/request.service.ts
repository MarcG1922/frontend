import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos, UsuarioMember } from '../models/response.interface';
import { Usuarios } from '../models/response.interface';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public apiUrl = 'http://localhost:8000/api/usuarios';

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

  public deleteEvento(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/eventos/${id}`);
  }

  public updateEvento(id: number, eventoData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      'Accept': 'application/ld+json'
    });

    const formattedData = {
      "@context": "/api/contexts/Evento",
      "@id": `/api/eventos/${id}`,
      "@type": "Evento",
      ...eventoData
    };

    console.log('Enviando petición PATCH a:', `http://localhost:8000/api/eventos/${id}`);
    console.log('Datos enviados:', formattedData);

    return this.http.patch(
      `http://localhost:8000/api/eventos/${id}`, 
      formattedData,
      { headers }
    ).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.error('Error en la petición:', error);
        return throwError(() => error);
      })
    );
  }

  public createEvento(eventoData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });

    const formattedData = {
      "@context": "/api/contexts/Evento",
      "@type": "Evento",
      ...eventoData
    };

    return this.http.post(
      'http://localhost:8000/api/eventos',
      formattedData,
      { headers }
    ).pipe(
      tap(response => console.log('Evento creado:', response)),
      catchError(error => {
        console.error('Error al crear evento:', error);
        return throwError(() => error);
      })
    );
  }
}
