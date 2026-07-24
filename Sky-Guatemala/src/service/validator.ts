import { Cliente } from "../models/Cliente";
import { Empleado } from "../models/Empleado";
import { Envio } from "../models/Envio";
import { Pago } from "../models/Pago";
import { Paquete } from "../models/Paquete";
import { Ruta } from "../models/Ruta";
import { Sucursal } from "../models/Sucursal";
import { Tracking } from "../models/Tracking";
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
//============================================
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
//============================================
// Validacion de Pago
//============================================
export function validarPago(pago: Pago): void {

    if (pago.monto <= 0) {
        throw new Error("El monto debe ser mayor que cero.");
    }

    if (!pago.metodo_pago.trim()) {
        throw new Error("El método de pago es obligatorio.");
    }

    if (!pago.fecha_pago.trim()) {
        throw new Error("La fecha de pago es obligatoria.");
    }

    if (!pago.id_envio) {
        throw new Error("El envío es obligatorio.");
    }
}
//============================================
// Validacion de paquete
//============================================
export function validarPaquete(paquete: Paquete): void {

    if (paquete.peso <= 0) {
        throw new Error("El peso debe ser mayor que cero.");
    }

    if (!paquete.tamaño.trim()) {
        throw new Error("El tamaño es obligatorio.");
    }

    if (!paquete.descripcion.trim()) {
        throw new Error("La descripción es obligatoria.");
    }

    if (!paquete.envio) {
        throw new Error("El envío es obligatorio.");
    }

    if (paquete.valor_declarado <= 0) {
        throw new Error("El valor declarado debe ser mayor que cero.");
    }
}
//============================================
// Validacion de Ruta
//============================================
export function validarRuta(ruta: Ruta): void {

    if (!ruta.origen.trim()) {
        throw new Error("El origen es obligatorio.");
    }

    if (!ruta.destino.trim()) {
        throw new Error("El destino es obligatorio.");
    }

    if (ruta.distancia_km <= 0) {
        throw new Error("La distancia debe ser mayor que cero.");
    }

    if (!ruta.tiempo_estimado.trim()) {
        throw new Error("El tiempo estimado es obligatorio.");
    }
}
//============================================
// Validacion de Sucursal
//============================================
export function validarSucursal(sucursal: Sucursal): void {

    if (!sucursal.nombre.trim()) {
        throw new Error("El nombre es obligatorio.");
    }

    if (!sucursal.ubicacion.trim()) {
        throw new Error("La ubicación es obligatoria.");
    }

    if (!sucursal.telefono.trim()) {
        throw new Error("El teléfono es obligatorio.");
    }
}
//============================================
// Validaciones de Tracking
//============================================
export function validarTracking(tracking: Tracking): void {

    if (!tracking.codigo_tracking.trim()) {
        throw new Error("El código de tracking es obligatorio.");
    }

    if (!tracking.ubicacion_actual.trim()) {
        throw new Error("La ubicación actual es obligatoria.");
    }

    if (!tracking.estado_actual.trim()) {
        throw new Error("El estado actual es obligatorio.");
    }

    if (!tracking.fecha_actualizacion) {
        throw new Error("La fecha de actualización es obligatoria.");
    }

    if (!tracking.id_envio) {
        throw new Error("El envío es obligatorio.");
    }
}
//============================================
// Validaciones de Vehiculo
//============================================

export function validarVehiculo(vehiculo: Vehiculo): void {

    if (!vehiculo.placa.trim()) {
        throw new Error("La placa es obligatoria.");
    }

    if (!vehiculo.tipo.trim()) {
        throw new Error("El tipo es obligatorio.");
    }

    if (!vehiculo.capacidad.trim()) {
        throw new Error("La capacidad es obligatoria.");
    }

    if (!vehiculo.estado.trim()) {
        throw new Error("El estado es obligatorio.");
    }
}