import { IncomingMessage, ServerResponse } from "http";
import { VueloService } from "../service/Vueloservice";
import { Vuelo } from "../models/Vuelo";

const vueloService = new VueloService();

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

    if (partes[0] !== "Vuelos") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {

            const vuelos = await vueloService.listarVuelos();
            sendJson(res, 200, vuelos);
            return;

        }

        if (req.method === "GET" && id !== undefined) {

            const vuelo = await vueloService.buscarVuelo(id);

            if (!vuelo) {
                sendJson(res, 404, { mensaje: "Vuelo no encontrado" });
                return;
            }

            sendJson(res, 200, vuelo);
            return;

        }

        if (req.method === "POST") {

            const body = await parseRequestBody(req) as Vuelo;

            await vueloService.agregarVuelo(body);

            sendJson(res, 201, { mensaje: "Vuelo agregado" });
            return;

        }

        if (req.method === "PUT" && id !== undefined) {

            const body = await parseRequestBody(req) as Vuelo;

            const actualizado = await vueloService.editarVuelo(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Vuelo no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Vuelo actualizado" });
            return;

        }

        if (req.method === "DELETE" && id !== undefined) {

            const eliminado = await vueloService.eliminarVuelo(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Vuelo no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Vuelo eliminado" });
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