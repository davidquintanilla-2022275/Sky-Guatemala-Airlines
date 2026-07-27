import { Cliente } from "../models/Cliente";
import { validarCliente } from "./validator";
import { conexion } from "../database/conexion";

export class ClienteService {

    async listarClientes(): Promise<Cliente[]> {
        const [rows] = await conexion.query("CALL sp_listar_cliente()");
        return (rows as any)[0] as Cliente[];
    }

    async agregarCliente(cliente: Cliente): Promise<void> {
        validarCliente(cliente);

        await conexion.query(
            "CALL sp_crear_cliente(?, ?, ?, ?, ?)",
            [
                cliente.nombre,
                cliente.apellido_empresa,
                cliente.telefono,
                cliente.correo,
                cliente.direccion
            ]
        );
    }

    async buscarCliente(id: number): Promise<Cliente | null> {
        const [rows] = await conexion.query(
            "CALL sp_buscar_cliente(?)",
            [id]
        );

        const resultado = (rows as any)[0];

        if (resultado.length === 0) {
            return null;
        }

        return resultado[0] as Cliente;
    }

    async eliminarCliente(id: number): Promise<boolean> {
        const cliente = await this.buscarCliente(id);

        if (!cliente) {
            return false;
        }

        await conexion.query(
            "CALL sp_eliminar_cliente(?)",
            [id]
        );

        return true;
    }

    async editarCliente(id: number, cliente: Cliente): Promise<boolean> {
        validarCliente(cliente);

        const existe = await this.buscarCliente(id);

        if (!existe) {
            return false;
        }

        await conexion.query(
            "CALL sp_actualizar_cliente(?, ?, ?, ?, ?, ?)",
            [
                id,
                cliente.nombre,
                cliente.apellido_empresa,
                cliente.telefono,
                cliente.correo,
                cliente.direccion
            ]
        );

        return true;
    }
}