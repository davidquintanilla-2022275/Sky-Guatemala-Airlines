import { Sucursal } from "../models/Sucursal";
import { validarSucursal } from "./validator";
import { conexion } from "../database/conexion";

export class SucursalService {

    async listarSucursales(): Promise<Sucursal[]> {
        const [rows] = await conexion.query("CALL sp_listar_sucursal()");
        return (rows as any)[0] as Sucursal[];
    }

    async agregarSucursal(sucursal: Sucursal): Promise<void> {
        validarSucursal(sucursal);

        await conexion.query(
            "CALL sp_crear_sucursal(?, ?, ?)",
            [
                sucursal.nombre,
                sucursal.ubicacion,
                sucursal.telefono
            ]
        );
    }

    async buscarSucursal(id: number): Promise<Sucursal | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_sucursal(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Sucursal;
    }

    async eliminarSucursal(id: number): Promise<boolean> {
        const sucursal = await this.buscarSucursal(id);

        if (!sucursal) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_sucursal(?)",
            [id]
        );

        return true;
    }

    async editarSucursal(id: number, sucursal: Sucursal): Promise<boolean> {
        validarSucursal(sucursal);

        const existe = await this.buscarSucursal(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_sucursal(?, ?, ?, ?)",
            [
                id,
                sucursal.nombre,
                sucursal.ubicacion,
                sucursal.telefono
            ]
        );

        return true;
    }
}