import { IncomingMessage, ServerResponse } from "http";
import { SucursalService } from "../service/Sucursalservice";
import { Sucursal } from "../models/Sucursal";

const sucursalService = new SucursalService();

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

    if (partes[0] !== "Sucursales") {
        sendJson(res, 404, { mensaje: "Ruta no encontrada" });
        return;
    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === "GET" && id === undefined) {

            const sucursales = await sucursalService.listarSucursales();
            sendJson(res, 200, sucursales);
            return;

        }

        if (req.method === "GET" && id !== undefined) {

            const sucursal = await sucursalService.buscarSucursal(id);

            if (!sucursal) {
                sendJson(res, 404, { mensaje: "Sucursal no encontrada" });
                return;
            }

            sendJson(res, 200, sucursal);
            return;

        }

        if (req.method === "POST") {

            const body = await parseRequestBody(req) as Sucursal;

            await sucursalService.agregarSucursal(body);

            sendJson(res, 201, { mensaje: "Sucursal agregada" });
            return;

        }

        if (req.method === "PUT" && id !== undefined) {

            const body = await parseRequestBody(req) as Sucursal;

            const actualizado = await sucursalService.editarSucursal(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: "Sucursal no encontrada" });
                return;
            }

            sendJson(res, 200, { mensaje: "Sucursal actualizada" });
            return;

        }

        if (req.method === "DELETE" && id !== undefined) {

            const eliminado = await sucursalService.eliminarSucursal(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: "Sucursal no encontrada" });
                return;
            }

            sendJson(res, 200, { mensaje: "Sucursal eliminada" });
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