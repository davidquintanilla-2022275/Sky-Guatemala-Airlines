import { IncomingMessage, ServerResponse } from "http";
import { VehiculoService } from "../service/Vehiculoservice";
import { Vehiculo } from "../models/Vehiculo";

const vehiculoService = new VehiculoService();

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
    res.writeHead(status, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

export async function routes(req: IncomingMessage, res: ServerResponse) {

    const url = new URL(req.url ?? "/", "http://localhost:3000");
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "Vehiculos") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {

            const vehiculos = await vehiculoService.listarVehiculos();
            sendJson(res, 200, vehiculos);
            return;

        }

        if (req.method === "GET" && id !== undefined) {

            const vehiculo = await vehiculoService.buscarVehiculo(id);

            if (!vehiculo) {
                sendJson(res, 404, { mensaje: "Vehículo no encontrado" });
                return;
            }

            sendJson(res, 200, vehiculo);
            return;

        }

        if (req.method === "POST") {

            const body = await parseRequestBody(req) as Vehiculo;

            await vehiculoService.agregarVehiculo(body);

            sendJson(res, 201, { mensaje: "Vehículo agregado" });
            return;

        }

        if (req.method === "PUT" && id !== undefined) {

            const body = await parseRequestBody(req) as Vehiculo;

            const actualizado = await vehiculoService.editarVehiculo(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Vehículo no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Vehículo actualizado" });
            return;

        }

        if (req.method === "DELETE" && id !== undefined) {

            const eliminado = await vehiculoService.eliminarVehiculo(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Vehículo no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Vehículo eliminado" });
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