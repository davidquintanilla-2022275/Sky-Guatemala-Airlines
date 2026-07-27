import { IncomingMessage, ServerResponse } from "http";
import { PaqueteService } from "../service/Paqueteservice";
import { Paquete } from "../models/Paquete";

const paqueteService = new PaqueteService();

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

    if (partes[0] !== "Paquetes") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {
            const paquetes = await paqueteService.listarPaquetes();
            sendJson(res, 200, paquetes);
            return;
        }

        if (req.method === "GET" && id !== undefined) {
            const paquete = await paqueteService.buscarPaquete(id);

            if (!paquete) {
                sendJson(res, 404, { mensaje: "Paquete no encontrado" });
                return;
            }

            sendJson(res, 200, paquete);
            return;
        }

        if (req.method === "POST") {
            const body = await parseRequestBody(req) as Paquete;

            await paqueteService.agregarPaquete(body);

            sendJson(res, 201, { mensaje: "Paquete agregado" });
            return;
        }

        if (req.method === "PUT" && id !== undefined) {
            const body = await parseRequestBody(req) as Paquete;

            const actualizado = await paqueteService.editarPaquete(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Paquete no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Paquete actualizado" });
            return;
        }

        if (req.method === "DELETE" && id !== undefined) {
            const eliminado = await paqueteService.eliminarPaquete(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Paquete no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Paquete eliminado" });
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