import { IncomingMessage, ServerResponse } from "http";
import { RutaService } from "../service/Rutaservice";
import { Ruta } from "../models/Ruta";

const rutaService = new RutaService();

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

    if (partes[0] !== "Rutas") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {

            const rutas = await rutaService.listarRutas();
            sendJson(res, 200, rutas);
            return;

        }

        if (req.method === "GET" && id !== undefined) {

            const ruta = await rutaService.buscarRuta(id);

            if (!ruta) {
                sendJson(res, 404, { mensaje: "Ruta no encontrada" });
                return;
            }

            sendJson(res, 200, ruta);
            return;

        }

        if (req.method === "POST") {

            const body = await parseRequestBody(req) as Ruta;

            await rutaService.agregarRuta(body);

            sendJson(res, 201, { mensaje: "Ruta agregada" });
            return;

        }

        if (req.method === "PUT" && id !== undefined) {

            const body = await parseRequestBody(req) as Ruta;

            const actualizado = await rutaService.editarRuta(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Ruta no encontrada" });
                return;
            }

            sendJson(res, 200, { mensaje: "Ruta actualizada" });
            return;

        }

        if (req.method === "DELETE" && id !== undefined) {

            const eliminado = await rutaService.eliminarRuta(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Ruta no encontrada" });
                return;
            }

            sendJson(res, 200, { mensaje: "Ruta eliminada" });
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