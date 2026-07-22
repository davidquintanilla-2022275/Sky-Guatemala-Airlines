import { Cliente } from "../models/Cliente";
import { validarCliente } from "./validator";

export class ClienteService {

    async listarClientes(): Promise<Cliente[]> {
        const clientes: Cliente[] = [];
        return clientes;
    }

    async agregarCliente(cliente: Cliente): Promise<void> {
        validarCliente(cliente);
    }

    async buscarCliente(id: number): Promise<Cliente | null> {
        return null;
    }

    async eliminarCliente(id: number): Promise<boolean> {
        if (id <= 0) return false;

        return false;
    }

    async editarCliente(id: number, cliente: Cliente): Promise<boolean> {
        validarCliente(cliente);

        if (id <= 0) return false;

        return false;
    }
}