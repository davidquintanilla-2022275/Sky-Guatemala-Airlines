import { Tracking } from "../models/Tracking";
import { validarTracking } from "./validator";
import { conexion } from "../database/conexion";

export class TrackingService {

    async listarTrackings(): Promise<Tracking[]> {
        const [rows] = await conexion.query("CALL sp_listar_tracking()");
        return (rows as any)[0] as Tracking[];
    }

    async agregarTracking(tracking: Tracking): Promise<void> {
        validarTracking(tracking);

        await conexion.query(
            "CALL sp_crear_tracking(?, ?, ?, ?, ?)",
            [
                tracking.codigo_tracking,
                tracking.ubicacion_actual,
                tracking.estado_actual,
                tracking.fecha_actualizacion,
                tracking.id_envio
            ]
        );
    }

    async buscarTracking(id: number): Promise<Tracking | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_tracking(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Tracking;
    }

    async eliminarTracking(id: number): Promise<boolean> {
        const tracking = await this.buscarTracking(id);

        if (!tracking) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_tracking(?)",
            [id]
        );

        return true;
    }

    async editarTracking(id: number, tracking: Tracking): Promise<boolean> {
        validarTracking(tracking);

        const existe = await this.buscarTracking(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_tracking(?, ?, ?, ?, ?, ?)",
            [
                id,
                tracking.codigo_tracking,
                tracking.ubicacion_actual,
                tracking.estado_actual,
                tracking.fecha_actualizacion,
                tracking.id_envio
            ]
        );

        return true;
    }
}