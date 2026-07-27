import { Ruta } from "../models/Ruta";
import { validarRuta } from "./validator";
import { conexion } from "../database/conexion";

export class RutaService {

    async listarRutas(): Promise<Ruta[]> {
        const [rows] = await conexion.query("CALL sp_listar_ruta()");
        return (rows as any)[0] as Ruta[];
    }

    async agregarRuta(ruta: Ruta): Promise<void> {
        validarRuta(ruta);

        await conexion.query(
            "CALL sp_crear_ruta(?, ?, ?, ?)",
            [
                ruta.origen,
                ruta.destino,
                ruta.distancia_km,
                ruta.tiempo_estimado
            ]
        );
    }

    async buscarRuta(id: number): Promise<Ruta | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_ruta(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Ruta;
    }

    async eliminarRuta(id: number): Promise<boolean> {
        const ruta = await this.buscarRuta(id);

        if (!ruta) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_ruta(?)",
            [id]
        );

        return true;
    }

    async editarRuta(id: number, ruta: Ruta): Promise<boolean> {
        validarRuta(ruta);

        const existe = await this.buscarRuta(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_ruta(?, ?, ?, ? ,?)",
            [
                id,
                ruta.origen,
                ruta.destino,
                ruta.distancia_km,
                ruta.tiempo_estimado
            ]
        );

        return true;
    }
}