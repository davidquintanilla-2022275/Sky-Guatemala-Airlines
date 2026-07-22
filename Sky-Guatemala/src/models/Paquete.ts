import { Envio } from "./Envio";

export interface Paquete {
    id_paquete: number;
    peso: number;
    tamaño: string;
    descripcion: string;
    envio: Envio;
    valor_declarado: number;
}