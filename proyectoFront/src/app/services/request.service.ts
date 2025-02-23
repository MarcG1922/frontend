import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos, UsuarioMember } from '../models/response.interface';
import { Usuarios } from '../models/response.interface';
import { tap, catchError, throwError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(public http: HttpClient) { }

  public getEventos(): Observable<Eventos> {
    return this.http.get<Eventos>(`${this.baseUrl}/eventos`);
  }

  public getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios`);
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

    return this.http.post<UsuarioMember>(`${this.baseUrl}/usuarios`, body, { headers });
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eventos/${id}`);
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

    return this.http.patch(
      `${this.baseUrl}/eventos/${id}`, 
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

  public createEvento(evento: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });

    // Limpiamos y validamos los datos antes de enviar
    const cleanedEvento = {
      titulo: evento.titulo?.trim() || '',
      descripcion: evento.descripcion?.trim() || '',
      imagen: evento.imagen || '',
      fecha: evento.fecha || new Date().toISOString(),
      ubicacion: evento.ubicacion?.trim() || '',
      comentarios: []
    };

    // Si la imagen es base64, la procesamos
    if (cleanedEvento.imagen.startsWith('data:image')) {
      return this.compressImage(cleanedEvento.imagen).pipe(
        switchMap(compressedImage => {
          const formattedData = {
            "@context": "/api/contexts/Evento",
            "@type": "Evento",
            "titulo": cleanedEvento.titulo,
            "descripcion": cleanedEvento.descripcion,
            "imagen": compressedImage,
            "fecha": cleanedEvento.fecha,
            "ubicacion": cleanedEvento.ubicacion,
            "comentarios": cleanedEvento.comentarios
          };

          return this.http.post(
            `${this.baseUrl}/eventos`,
            formattedData,
            { headers }
          );
        })
      );
    } else {
      // Si no es base64, usamos la URL directamente
      cleanedEvento.imagen = cleanedEvento.imagen.startsWith('http') 
        ? cleanedEvento.imagen 
        : "https://via.placeholder.com/300";

      const formattedData = {
        "@context": "/api/contexts/Evento",
        "@type": "Evento",
        "titulo": cleanedEvento.titulo,
        "descripcion": cleanedEvento.descripcion,
        "imagen": cleanedEvento.imagen,
        "fecha": cleanedEvento.fecha,
        "ubicacion": cleanedEvento.ubicacion,
        "comentarios": cleanedEvento.comentarios
      };

      return this.http.post(
        `${this.baseUrl}/eventos`,
        formattedData,
        { headers }
      );
    }
  }

  private compressImage(base64: string): Observable<string> {
    return new Observable(observer => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Reducimos el tamaño máximo a 400px
        let width = img.width;
        let height = img.height;
        const maxSize = 400; // Reducido de 800 a 400
        
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Aumentamos la compresión reduciendo la calidad a 0.3
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.3);

        // Verificamos el tamaño del string resultante
        if (compressedBase64.length > 65535) { // Tamaño máximo típico para VARCHAR
          // Si aún es muy grande, reducimos más
          const canvas2 = document.createElement('canvas');
          const ctx2 = canvas2.getContext('2d');
          const scale = Math.sqrt(65535 / compressedBase64.length);
          
          canvas2.width = Math.round(width * scale);
          canvas2.height = Math.round(height * scale);
          
          ctx2?.drawImage(img, 0, 0, canvas2.width, canvas2.height);
          const finalImage = canvas2.toDataURL('image/jpeg', 0.3);
          
          observer.next(finalImage);
        } else {
          observer.next(compressedBase64);
        }
        
        observer.complete();
      };
      img.onerror = error => observer.error(error);
    });
  }
}
