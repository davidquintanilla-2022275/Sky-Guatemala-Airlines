import { IncomingMessage, ServerResponse } from "http";
import { PagoService } from "../service/Pagoservice";
import { Pago } from "../models/Pago";

const pagoService = new PagoService();

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

    if (partes[0] !== "Pagos") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {
            const pagos = await pagoService.listarPagos();
            sendJson(res, 200, pagos);
            return;
        }

        if (req.method === "GET" && id !== undefined) {
            const pago = await pagoService.buscarPago(id);

            if (!pago) {
                sendJson(res, 404, { mensaje: "Pago no encontrado" });
                return;
            }

            sendJson(res, 200, pago);
            return;
        }

        if (req.method === "POST") {
            const body = await parseRequestBody(req) as Pago;

            await pagoService.agregarPago(body);

            sendJson(res, 201, { mensaje: "Pago agregado" });
            return;
        }

        if (req.method === "PUT" && id !== undefined) {
            const body = await parseRequestBody(req) as Pago;

            const actualizado = await pagoService.editarPago(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Pago no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Pago actualizado" });
            return;
        }

        if (req.method === "DELETE" && id !== undefined) {
            const eliminado = await pagoService.eliminarPago(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Pago no encontrado" });
                return;
            }

            sendJson(res, 200, { mensaje: "Pago eliminado" });
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