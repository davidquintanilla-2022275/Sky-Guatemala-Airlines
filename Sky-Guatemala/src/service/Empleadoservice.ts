import { Empleado } from "../models/Empleado";
import { validarEmpleado } from "./validator";
import { conexion } from "../database/conexion";

export class EmpleadoService {

    async listarEmpleados(): Promise<Empleado[]> {
        const [rows] = await conexion.query("CALL sp_listar_empleado()");
        return (rows as any)[0] as Empleado[];
    }

    async agregarEmpleado(empleado: Empleado): Promise<void> {
        validarEmpleado(empleado);

        await conexion.query(
            "CALL sp_crear_empleado(?, ?, ?, ?)",
            [
                empleado.nombre,
                empleado.puesto,
                empleado.telefono,
                empleado.id_sucursal
            ]
        );
    }

    async buscarEmpleado(id: number): Promise<Empleado | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_empleado(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Empleado;
    }

    async eliminarEmpleado(id: number): Promise<boolean> {
        const empleado = await this.buscarEmpleado(id);

        if (!empleado) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_empleado(?)",
            [id]
        );

        return true;
    }

    async editarEmpleado(id: number, empleado: Empleado): Promise<boolean> {
        validarEmpleado(empleado);

        const existe = await this.buscarEmpleado(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_empleado(?, ?, ?, ?, ?)",
            [
                id,
                empleado.nombre,
                empleado.puesto,
                empleado.telefono,
                empleado.id_sucursal
            ]
        );

        return true;
    }
}