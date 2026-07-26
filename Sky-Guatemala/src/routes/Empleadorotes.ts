import { IncomingMessage, ServerResponse } from "http";
import { EmpleadoService } from "../service/Empleadoservice";
import { Empleado } from "../models/Empleado";

const empleadoService = new EmpleadoService();

function parseRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
    });
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

export async function routes(req: IncomingMessage, res: ServerResponse) {

    const url = new URL(req.url ?? "/", "http://localhost:3000");
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "Empleados") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {
            const empleados = await empleadoService.listarEmpleados();
            sendJson(res, 200, empleados);
            return;
        }

        if (req.method === "GET" && id !== undefined) {
            const empleado = await empleadoService.buscarEmpleado(id);

            if (!empleado) {
                sendJson(res, 404, { mensaje: "Empleado no encontrado" });
                return;
            }

            sendJson(res, 200, empleado);
            return;
        }

        if (req.method === "POST") {
            const body = await parseRequestBody(req) as Empleado;

            await empleadoService.agregarEmpleado(body);

            sendJson(res, 201, { mensaje: "Empleado agregado" });
            return;
        }

        if (req.method === "PUT" && id !== undefined) {
            const body = await parseRequestBody(req) as Empleado;

            const actualizado = await empleadoService.editarEmpleado(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Empleado no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Empleado actualizado" });
            return;
        }

        if (req.method === "DELETE" && id !== undefined) {
            const eliminado = await empleadoService.eliminarEmpleado(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Empleado no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Empleado eliminado" });
            return;
        }

        sendJson(res, 405, { mensaje: "Método no permitido" });

    } catch (error) {

        console.error(error);

        sendJson(res, 500, {
            mensaje: "Error interno del servidor",
            error: error instanceof Error ? error.message : error
        });

    }
}