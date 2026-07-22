import { IncomingMessage, ServerResponse } from 'http';
import { ClienteService } from '../service/Clienteservice';
import { Cliente } from '../models/Cliente';

const clienteService = new ClienteService();

function parseRequestBody(req: IncomingMessage): Promise<any> {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }

        });

    });

}

function sendJson(res: ServerResponse, status: number, data: unknown) {

    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

}

export async function routes(req: IncomingMessage, res: ServerResponse) {

    const url = new URL(req.url ?? '/', 'http://localhost:3000');
    const partes = url.pathname.split('/').filter(Boolean);

    if (partes[0] !== 'Clientes') {

        sendJson(res, 404, { mensaje: 'Ruta no encontrada' });
        return;

    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === 'GET' && id === undefined) {

            const clientes = await clienteService.listarClientes();
            sendJson(res, 200, clientes);
            return;

        }

        if (req.method === 'GET' && id !== undefined) {

            const cliente = await clienteService.buscarCliente(id);

            if (!cliente) {
                sendJson(res, 404, { mensaje: 'Cliente no encontrado' });
                return;
            }

            sendJson(res, 200, cliente);
            return;

        }

        if (req.method === 'POST') {

            const body = await parseRequestBody(req) as Cliente;

            await clienteService.agregarCliente(body);

            sendJson(res, 201, { mensaje: 'Cliente agregado' });
            return;

        }

        if (req.method === 'PUT' && id !== undefined) {

            const body = await parseRequestBody(req) as Cliente;

            const actualizado = await clienteService.editarCliente(id, body);

            if (!actualizado) {
                sendJson(res, 404, { mensaje: 'Cliente no encontrado' });
                return;
            }

            sendJson(res, 200, { mensaje: 'Cliente actualizado' });
            return;

        }

        if (req.method === 'DELETE' && id !== undefined) {

            const eliminado = await clienteService.eliminarCliente(id);

            if (!eliminado) {
                sendJson(res, 404, { mensaje: 'Cliente no encontrado' });
                return;
            }

            sendJson(res, 200, { mensaje: 'Cliente eliminado' });
            return;

        }

        sendJson(res, 405, { mensaje: 'Método no permitido' });

    } catch (error) {

        console.error(error);

    sendJson(res, 500, { 
        mensaje: 'Error interno del servidor',
        error: error instanceof Error ? error.message : error
    });

    }

}