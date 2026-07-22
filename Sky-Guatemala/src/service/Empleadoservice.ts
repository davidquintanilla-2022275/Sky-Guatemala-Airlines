import { Empleado } from "../models/Empleado";
import { validarEmpleado } from "./validator";

export class EmpleadoService {

    async listarEmpleados(): Promise<Empleado[]> {
        const empleados: Empleado[] = [];
        return empleados;
    }

    async agregarEmpleado(empleado: Empleado): Promise<void> {
        validarEmpleado(empleado);
    }

    async buscarEmpleado(id: number): Promise<Empleado | null> {
        return null;
    }

    async eliminarEmpleado(id: number): Promise<boolean> {
        if (id <= 0) return false;

        return false;
    }

    async editarEmpleado(id: number, empleado: Empleado): Promise<boolean> {
        validarEmpleado(empleado);

        if (id <= 0) return false;

        return false;
    }
}
