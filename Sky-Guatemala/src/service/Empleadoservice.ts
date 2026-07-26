import { Empleado } from "../models/Empleado";
import { validarEmpleado } from "./validator";
import empleados from "../data/Empleado.json";
import fs from "fs/promises";
import path from "path";

const ruta = path.join(__dirname, "../data/Empleado.json");

export class EmpleadoService {

    async listarEmpleados(): Promise<Empleado[]> {
        return empleados as Empleado[];
    }

    async agregarEmpleado(empleado: Empleado): Promise<void> {
        validarEmpleado(empleado);

        (empleados as Empleado[]).push(empleado);

        await fs.writeFile(
            ruta,
            JSON.stringify(empleados, null, 2),
            "utf-8"
        );
    }

    async buscarEmpleado(id: number): Promise<Empleado | null> {
        const empleado = (empleados as Empleado[]).find(e => e.id_empleado === id);
        return empleado ?? null;
    }

    async eliminarEmpleado(id: number): Promise<boolean> {
        if (id <= 0) return false;

        const lista = empleados as Empleado[];
        const index = lista.findIndex(e => e.id_empleado === id);

        if (index === -1) return false;

        lista.splice(index, 1);

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }

    async editarEmpleado(id: number, empleado: Empleado): Promise<boolean> {
        validarEmpleado(empleado);

        if (id <= 0) return false;

        const lista = empleados as Empleado[];
        const index = lista.findIndex(e => e.id_empleado === id);

        if (index === -1) return false;

        lista[index] = empleado;

        await fs.writeFile(
            ruta,
            JSON.stringify(lista, null, 2),
            "utf-8"
        );

        return true;
    }
}