import { Envio } from "./Envio";   

export interface Tracking {
    id_tracking: number;
    codigo_tracking: string;
    ubicacion_actual: string;
    estado_actual: string;
    fecha_actualizacion: Date;
    id_envio: Envio;

}