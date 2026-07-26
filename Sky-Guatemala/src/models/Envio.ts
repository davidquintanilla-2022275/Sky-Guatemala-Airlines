import { Sucursal } from "./Sucursal";
import { Cliente } from "./Cliente";


export interface Envio {
    id_envio: number;
    fecha_envio: string;
    estado: string;
    costo: number;
    sucursal: Sucursal;
    cliente: Cliente;
}
