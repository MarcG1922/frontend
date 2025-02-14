export interface Eventos {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
    "@id":       string;
    "@type":     string;
    id:          number;
    titulo:      string;
    descripcion: string;
    imagen:      string;
    comentarios: any[];
    fecha:       Date;
}
