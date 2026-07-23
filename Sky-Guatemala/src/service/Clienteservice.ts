import { Cliente } from "../models/Cliente";
import { validarCliente } from "./validator";
import clientes from "../data/Cliente.json";
import fs from "fs/promises";
import path from "path";

const ruta = path.join(__dirname, "../data/Cliente.json");

export class ClienteService {

    async listarClientes(): Promise<Cliente[]> {
        return clientes as Cliente[];
    }

    async agregarCliente(cliente: Cliente): Promise<void> {
    validarCliente(cliente);

    (clientes as Cliente[]).push(cliente);

    await fs.writeFile(
        ruta,
        JSON.stringify(clientes, null, 2),
        "utf-8"
    );
}

    async buscarCliente(id: number): Promise<Cliente | null> {
        const cliente = (clientes as Cliente[]).find(c => c.id_clinte === id);
        return cliente ?? null;
    }

    async eliminarCliente(id: number): Promise<boolean> {
    if (id <= 0) return false;

    const lista = clientes as Cliente[];
    const index = lista.findIndex(c => c.id_clinte === id);

    if (index === -1) return false;

    lista.splice(index, 1);

    await fs.writeFile(
        ruta,
        JSON.stringify(lista, null, 2),
        "utf-8"
    );

    return true;
}

  async editarCliente(id: number, cliente: Cliente): Promise<boolean> {
    validarCliente(cliente);

    if (id <= 0) return false;

    const lista = clientes as Cliente[];
    const index = lista.findIndex(c => c.id_clinte === id);

    if (index === -1) return false;

    lista[index] = cliente;

    await fs.writeFile(
        ruta,
        JSON.stringify(lista, null, 2),
        "utf-8"
    );

    return true;
}
}