import { Envio } from "../models/Envio";
import { validarEnvio } from "./validator";
import { conexion } from "../database/conexion";

export class EnvioService {

    async listarEnvios(): Promise<Envio[]> {
        const [rows] = await conexion.query("CALL sp_listar_envio()");
        return (rows as any)[0] as Envio[];
    }

    async agregarEnvio(envio: Envio): Promise<void> {
        validarEnvio(envio);

        await conexion.query(
            "CALL sp_crear_envio(?, ?, ?, ?, ?, ?)",
            [
                envio.fecha_envio,
                envio.estado,
                envio.costo,
                envio.id_cliente,
                envio.id_sucursal_origen,
                envio.id_sucursal_destino
            ]
        );
    }

    async buscarEnvio(id: number): Promise<Envio | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_envio(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Envio;
    }

    async eliminarEnvio(id: number): Promise<boolean> {
        const envio = await this.buscarEnvio(id);

        if (!envio) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_envio(?)",
            [id]
        );

        return true;
    }

    async editarEnvio(id: number, envio: Envio): Promise<boolean> {
        validarEnvio(envio);

        const existe = await this.buscarEnvio(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_envio(?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                envio.fecha_envio,
                envio.estado,
                envio.costo,
                envio.id_cliente,
                envio.id_sucursal_origen,
                envio.id_sucursal_destino
            ]
        );

        return true;
    }
}