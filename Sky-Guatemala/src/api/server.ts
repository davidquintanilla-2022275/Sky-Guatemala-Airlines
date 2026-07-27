import { createServer } from "http";
import { routes as clienteRoutes } from "../routes/Clienteroutes";
import { routes as empleadoRoutes } from "../routes/Empleadorotes";
import { routes as envioRoutes } from "../routes/Envioroutes";
import { routes as pagoRoutes } from "../routes/Pagoroutes";
import { routes as paqueteRoutes } from "../routes/Paqueteroutes";

const servidor = createServer(async (req, res) => {

    const url = req.url ?? "";

    if (url.startsWith("/Clientes")) {
        return clienteRoutes(req, res);
    }

    if (url.startsWith("/Empleados")) {
        return empleadoRoutes(req, res);
    }

    if (url.startsWith("/Envio")){
        return envioRoutes(req, res);
    }

    if (url.startsWith("/Pago")){
        return pagoRoutes(req, res);
    }

    if (url.startsWith("/Paquete")){
        return paqueteRoutes(req,res);
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        mensaje: "Ruta no encontrada"
    }));
});

servidor.listen(3000, () => {
    console.log("===================================");
    console.log("Servidor iniciado");
    console.log("http://localhost:3000");
    console.log("===================================");
});