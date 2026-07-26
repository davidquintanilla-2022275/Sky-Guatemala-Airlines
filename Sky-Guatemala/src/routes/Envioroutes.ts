import { IncomingMessage, ServerResponse } from "http";
import { EnvioService } from "../service/Envioservice";
import { Envio } from "../models/Envio";

const envioService = new EnvioService();

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

    if (partes[0] !== "Envios") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {
            const envios = await envioService.listarEnvios();
            sendJson(res, 200, envios);
            return;
        }

        if (req.method === "GET" && id !== undefined) {
            const envio = await envioService.buscarEnvio(id);

            if (!envio) {
                sendJson(res, 404, { mensaje: "Envío no encontrado" });
                return;
            }

            sendJson(res, 200, envio);
            return;
        }

        if (req.method === "POST") {
            const body = await parseRequestBody(req) as Envio;

            await envioService.agregarEnvio(body);

            sendJson(res, 201, { mensaje: "Envío agregado" });
            return;
        }

        if (req.method === "PUT" && id !== undefined) {
            const body = await parseRequestBody(req) as Envio;

            const actualizado = await envioService.editarEnvio(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Envío no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Envío actualizado" });
            return;
        }

        if (req.method === "DELETE" && id !== undefined) {
            const eliminado = await envioService.eliminarEnvio(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Envío no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Envío eliminado" });
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