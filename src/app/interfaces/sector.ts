export interface Sector {
        id_empresa: number;
        nombre: string;
        fecha_creacion: string;
        cerco_virtual: { lat: number, lng: number }[];
        fecha_modificacion: string;
        estado: number;
     
}
