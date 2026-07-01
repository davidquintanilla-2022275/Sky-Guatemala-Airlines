import { Envio } from "./Envio";

export interface Pago{
    id_pago: number;
    monto: number;
    metodo_pago: string;
    fecha_pago: string;
    id_envio: Envio;
}