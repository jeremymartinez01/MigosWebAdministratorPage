export interface SectorGet {
    id_sector: number,
    id_empresa: number,
    id_campana: number,
    id_ciudad: number,
    id_pais: number
    nombre: string;
    fecha_creacion: string;
    cerco_virtual: { lat: number, lng: number }[];
    zoom: number;
    centro: { lat: number, lng: number };
    fecha_modificacion: string;
    estado: number;
}
