import { Pago } from "../models/Pago";
import { validarPago } from "./validator";
import pagos from "../data/Pago.json";
import fs from "fs/promises";
import path from "path";

const ruta = path.join(__dirname, "../data/Pago.json");

export class PagoService {

    async listarPagos(): Promise<Pago[]> {
        return pagos as Pago[];
    }

    async agregarPago(pago: Pago): Promise<void> {
        validarPago(pago);

        (pagos as Pago[]).push(pago);

        await fs.writeFile(
            ruta,
            JSON.stringify(pagos, null, 2),
            "utf-8"
        );
    }

    async buscarPago(id: number): Promise<Pago | null> {
        const pago = (pagos as Pago[]).find(p => p.id_pago === id);
        return pago ?? null;
    }

    async eliminarPago(id: number): Promise<boolean> {
        if (id <= 0) return false;

        const lista = pagos as Pago[];
        const index = lista.findIndex(p => p.id_pago === id);

        if (index === -1) return false;

        lista.splice(index, 1);

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }

    async editarPago(id: number, pago: Pago): Promise<boolean> {
        validarPago(pago);

        if (id <= 0) return false;

        const lista = pagos as Pago[];
        const index = lista.findIndex(p => p.id_pago === id);

        if (index === -1) return false;

        lista[index] = pago;

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }
}