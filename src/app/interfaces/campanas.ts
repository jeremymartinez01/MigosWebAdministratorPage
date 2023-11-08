export interface Campanas {
    id_campana: number;
    id_empresa: number; 
    nombre_campana: string;
    fecha_inicio: Date; 
    fecha_fin: Date; 
    fecha_fin_registro: Date; 
    presupuesto: number;
    nombre_responsable: string;
    tarifa_base: number;
    taller_brandeo: string;
    carroceria_capo: boolean;
    puerta_conductor: boolean;
    puerta_pasajero: boolean;
    puerta_traseratzq: boolean;
    puerta_traseraDer: boolean;
    carroceria_guantera: boolean;
    carroceria_techo: boolean;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    estado: number;
  }
  