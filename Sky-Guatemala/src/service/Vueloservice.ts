import { Vuelo } from "../models/Vuelo";
import { validarVuelo } from "./validator";
import { conexion } from "../database/conexion";

export class VueloService {

    async listarVuelos(): Promise<Vuelo[]> {
        const [rows] = await conexion.query("CALL sp_listar_vuelo()");
        return (rows as any)[0] as Vuelo[];
    }

    async agregarVuelo(vuelo: Vuelo): Promise<void> {
        validarVuelo(vuelo);

        await conexion.query(
            "CALL sp_crear_vuelo(?, ?, ?, ?, ?, ?)",
            [
                vuelo.numero_vuelo,
                vuelo.origen,
                vuelo.destino,
                vuelo.fecha_salida,
                vuelo.fecha_llegada,
                vuelo.id_ruta
            ]
        );
    }

    async buscarVuelo(id: number): Promise<Vuelo | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_vuelo(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Vuelo;
    }

    async eliminarVuelo(id: number): Promise<boolean> {
        const vuelo = await this.buscarVuelo(id);

        if (!vuelo) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_vuelo(?)",
            [id]
        );

        return true;
    }

    async editarVuelo(id: number, vuelo: Vuelo): Promise<boolean> {
        validarVuelo(vuelo);

        const existe = await this.buscarVuelo(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_vuelo(?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                vuelo.numero_vuelo,
                vuelo.origen,
                vuelo.destino,
                vuelo.fecha_salida,
                vuelo.fecha_llegada,
                vuelo.id_ruta
            ]
        );

        return true;
    }
}