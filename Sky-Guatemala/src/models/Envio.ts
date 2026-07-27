export interface Envio {
    id_envio: number;
    fecha_envio: string;
    estado: string;
    costo: number;
    id_cliente: number;
    id_sucursal_origen: number;
    id_sucursal_destino: number;
}