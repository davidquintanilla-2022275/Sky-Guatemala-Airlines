import { Envio } from "../models/Envio";
import { validarEnvio } from "./validator";
import envios from "../data/Envio.json";
import fs from "fs/promises";
import path from "path";

const ruta = path.join(__dirname, "../data/Envio.json");

export class EnvioService {

    async listarEnvios(): Promise<Envio[]> {
        return envios as Envio[];
    }

    async agregarEnvio(envio: Envio): Promise<void> {
        validarEnvio(envio);

        (envios as Envio[]).push(envio);

        await fs.writeFile(
            ruta,
            JSON.stringify(envios, null, 2),
            "utf-8"
        );
    }

    async buscarEnvio(id: number): Promise<Envio | null> {
        const envio = (envios as Envio[]).find(e => e.id_envio === id);
        return envio ?? null;
    }

    async eliminarEnvio(id: number): Promise<boolean> {
        if (id <= 0) return false;

        const lista = envios as Envio[];
        const index = lista.findIndex(e => e.id_envio === id);

        if (index === -1) return false;

        lista.splice(index, 1);

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }

    async editarEnvio(id: number, envio: Envio): Promise<boolean> {
        validarEnvio(envio);

        if (id <= 0) return false;

        const lista = envios as Envio[];
        const index = lista.findIndex(e => e.id_envio === id);

        if (index === -1) return false;

        lista[index] = envio;

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }
}