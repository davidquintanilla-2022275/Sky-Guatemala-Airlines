import { Vehiculo } from "../models/Vehiculo";
import { validarVehiculo } from "./validator";
import { conexion } from "../database/conexion";

export class VehiculoService {

    async listarVehiculos(): Promise<Vehiculo[]> {
        const [rows] = await conexion.query("CALL sp_listar_vehiculo()");
        return (rows as any)[0] as Vehiculo[];
    }

    async agregarVehiculo(vehiculo: Vehiculo): Promise<void> {
        validarVehiculo(vehiculo);

        await conexion.query(
            "CALL sp_crear_vehiculo(?, ?, ?, ?)",
            [
                vehiculo.placa,
                vehiculo.tipo,
                vehiculo.capacidad,
                vehiculo.estado
            ]
        );
    }

    async buscarVehiculo(id: number): Promise<Vehiculo | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_vehiculo(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Vehiculo;
    }

    async eliminarVehiculo(id: number): Promise<boolean> {
        const vehiculo = await this.buscarVehiculo(id);

        if (!vehiculo) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_vehiculo(?)",
            [id]
        );

        return true;
    }

    async editarVehiculo(id: number, vehiculo: Vehiculo): Promise<boolean> {
        validarVehiculo(vehiculo);

        const existe = await this.buscarVehiculo(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_vehiculo(?, ?, ?, ?, ?)",
            [
                id,
                vehiculo.placa,
                vehiculo.tipo,
                vehiculo.capacidad,
                vehiculo.estado
            ]
        );

        return true;
    }
}