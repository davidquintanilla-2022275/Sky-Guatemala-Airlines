import { Pago } from "../models/Pago";
import { validarPago } from "./validator";
import { conexion } from "../database/conexion";

export class PagoService {

    async listarPagos(): Promise<Pago[]> {
        const [rows] = await conexion.query("CALL sp_listar_pago()");
        return (rows as any)[0] as Pago[];
    }

    async agregarPago(pago: Pago): Promise<void> {
        validarPago(pago);

        await conexion.query(
            "CALL sp_crear_pago(?, ?, ?, ?)",
            [
                pago.monto,
                pago.metodo_pago,
                pago.fecha_pago,
                pago.id_envio
            ]
        );
    }

    async buscarPago(id: number): Promise<Pago | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_pago(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Pago;
    }

    async eliminarPago(id: number): Promise<boolean> {
        const pago = await this.buscarPago(id);

        if (!pago) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_pago(?)",
            [id]
        );

        return true;
    }

    async editarPago(id: number, pago: Pago): Promise<boolean> {
        validarPago(pago);

        const existe = await this.buscarPago(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_pago(?, ?, ?, ?, ?)",
            [
                id,
                pago.monto,
                pago.metodo_pago,
                pago.fecha_pago,
                pago.id_envio
            ]
        );

        return true;
    }
}