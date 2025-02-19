export interface Eventos {
    "@context": string;
    "@id": string;
    "@type": string;
    totalItems: number;
    member: EventoMember[];
}

export interface EventoMember {
    "@id": string;
    "@type": string;
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    comentarios: any[];
    fecha: Date;
}

export interface Usuarios {
    "@context": string;
    "@id": string;
    "@type": string;
    totalItems: number;
    member: UsuarioMember[];
}

export interface UsuarioMember {
    "@id": string;
    "@type": string;
    id: number;
    nombre: string;
    email: string;
    contrasenya: string;
    telefono: number;
    admin: boolean;
    comentarios: any[];
}

export interface Comentarios {
    "@context": string;
    "@id": string;
    "@type": string;
    totalItems: number;
    member: ComentarioMember[];
}

export interface ComentarioMember {
    "@id": string;
    "@type": string;
    id: number;
    comentario: string;
    usuario: string;
    evento: string;
    fecha: Date;
}
