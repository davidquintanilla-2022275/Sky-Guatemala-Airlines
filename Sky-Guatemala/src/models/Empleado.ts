import { Sucursal } from "./Sucursal";

export interface Empleado {
    id_empleado: number;
    nombre: string;
    puesto: string;
    telefono: string;
    id_sucursal: Sucursal;

}