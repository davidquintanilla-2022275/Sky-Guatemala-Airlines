import { Paquete } from "../models/Paquete";
import { validarPaquete } from "./validator";
import { conexion } from "../database/conexion";

export class PaqueteService {

    async listarPaquetes(): Promise<Paquete[]> {
        const [rows] = await conexion.query("CALL sp_listar_paquete()");
        return (rows as any)[0] as Paquete[];
    }

    async agregarPaquete(paquete: Paquete): Promise<void> {
        validarPaquete(paquete);

        await conexion.query(
            "CALL sp_crear_paquete(?, ?, ?, ?, ?)",
            [
                paquete.peso,
                paquete.tamaño,
                paquete.descripcion,
                paquete.valor_declarado,
                paquete.id_envio
            ]
        );
    }

    async buscarPaquete(id: number): Promise<Paquete | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_paquete(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Paquete;
    }

    async eliminarPaquete(id: number): Promise<boolean> {
        const paquete = await this.buscarPaquete(id);

        if (!paquete) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_paquete(?)",
            [id]
        );

        return true;
    }

    async editarPaquete(id: number, paquete: Paquete): Promise<boolean> {
        validarPaquete(paquete);

        const existe = await this.buscarPaquete(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_paquete(?, ?, ?, ?, ?, ?)",
            [
                id,
                paquete.peso,
                paquete.tamaño,
                paquete.descripcion,
                paquete.valor_declarado,
                paquete.id_envio
            ]
        );

        return true;
    }
}