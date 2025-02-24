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
    ubicacion: string;
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

