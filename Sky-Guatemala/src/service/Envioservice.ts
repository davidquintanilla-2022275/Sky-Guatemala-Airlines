import { Envio } from "../models/Envio";
import { validarEnvio } from "./validator";

export class EnvioService {

    async listarEnvios(): Promise<Envio[]> {
        const envios: Envio[] = [];
        return envios;
    }

    async agregarEnvio(envio: Envio): Promise<void> {
        validarEnvio(envio);
    }

    async buscarEnvio(id: number): Promise<Envio | null> {
        return null;
    }

    async eliminarEnvio(id: number): Promise<boolean> {
        if (id <= 0) return false;

        return false;
    }

    async editarEnvio(id: number, envio: Envio): Promise<boolean> {
        validarEnvio(envio);

        if (id <= 0) return false;

        return false;
    }
}