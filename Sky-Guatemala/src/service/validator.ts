import { Cliente } from "../models/Cliente";
import { Empleado } from "../models/Empleado";
import { Envio } from "../models/Envio";
import { Pago } from "../models/Pago";
import { Paquete } from "../models/Paquete";
import { Ruta } from "../models/Ruta";
import { Sucursal } from "../models/Sucursal";
import { Tracing } from "node:trace_events";
import { Vehiculo } from "../models/Vehiculo";
import { Vuelo } from "../models/Vuelo";

//============================================
//Validaciones de Cliente
//============================================
export function validarCliente(cliente: Cliente): void {

    if (!cliente.nombre.trim()) {
        throw new Error("El nombre es obligatorio.");
    }

    if (!cliente.apellido.trim()) {
        throw new Error("El apellido es obligatorio.");
    }

    if (!cliente.telefono.trim()) {
        throw new Error("El teléfono es obligatorio.");
    }

    if (!cliente.correo.trim()) {
        throw new Error("El correo es obligatorio.");
    }

    if (!cliente.direccion.trim()) {
        throw new Error("La dirección es obligatoria.");
    }
}
//============================================
//Validaciones de Empleado
//============================================
export function validarEmpleado(empleado: Empleado): void {

    if (!empleado.nombre.trim()) {
        throw new Error("El nombre es obligatorio.");
    }

    if (!empleado.puesto.trim()) {
        throw new Error("El puesto es obligatorio.");
    }

    if (!empleado.telefono.trim()) {
        throw new Error("El teléfono es obligatorio.");
    }

    if (!empleado.id_sucursal) {
        throw new Error("La sucursal es obligatoria.");
    }
}
//============================================
//Validacion de Envio
//============================================3
export function validarEnvio(envio: Envio): void {

    if (!envio.fecha_envio) {
        throw new Error("La fecha de envío es obligatoria.");
    }

    if (!envio.estado.trim()) {
        throw new Error("El estado es obligatorio.");
    }

    if (envio.costo <= 0) {
        throw new Error("El costo debe ser mayor que cero.");
    }

    if (!envio.sucursal) {
        throw new Error("La sucursal es obligatoria.");
    }

    if (!envio.cliente) {
        throw new Error("El cliente es obligatorio.");
    }
}