import { Paquete } from "../models/Paquete";
import { validarPaquete } from "./validator";
import paquetes from "../data/Paquete.json";
import fs from "fs/promises";
import path from "path";

const ruta = path.join(__dirname, "../data/Paquete.json");

export class PaqueteService {

    async listarPaquetes(): Promise<Paquete[]> {
        return paquetes as Paquete[];
    }

    async agregarPaquete(paquete: Paquete): Promise<void> {
        validarPaquete(paquete);

        (paquetes as Paquete[]).push(paquete);

        await fs.writeFile(
            ruta,
            JSON.stringify(paquetes, null, 2),
            "utf-8"
        );
    }

    async buscarPaquete(id: number): Promise<Paquete | null> {
        const paquete = (paquetes as Paquete[]).find(p => p.id_paquete === id);
        return paquete ?? null;
    }

    async eliminarPaquete(id: number): Promise<boolean> {
        if (id <= 0) return false;

        const lista = paquetes as Paquete[];
        const index = lista.findIndex(p => p.id_paquete === id);

        if (index === -1) return false;

        lista.splice(index, 1);

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }

    async editarPaquete(id: number, paquete: Paquete): Promise<boolean> {
        validarPaquete(paquete);

        if (id <= 0) return false;

        const lista = paquetes as Paquete[];
        const index = lista.findIndex(p => p.id_paquete === id);

        if (index === -1) return false;

        lista[index] = paquete;

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }
}