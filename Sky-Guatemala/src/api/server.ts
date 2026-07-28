import { createServer } from "http";
import { routes as clienteRoutes } from "../routes/Clienteroutes";
import { routes as empleadoRoutes } from "../routes/Empleadorotes";
import { routes as envioRoutes } from "../routes/Envioroutes";
import { routes as pagoRoutes } from "../routes/Pagoroutes";
import { routes as paqueteRoutes } from "../routes/Paqueteroutes";
import { routes as rutaRoutes } from "../routes/Rutaroutes";
import { routes as sucursalRoutes } from "../routes/Sucursalroutes";
import { routes as trackingRoutes } from "../routes/Trackingroutes";
import { routes as vehiculoRoutes } from "../routes/Vehiculoroutes";
import { routes as vueloRoutes } from "../routes/Vueloroutes";

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

    if (url.startsWith("/Ruta")){
        return rutaRoutes(req, res);
    }

    if (url.startsWith("/Sucursal")){
        return sucursalRoutes(req, res);
    }

    if (url.startsWith("/Tracking")){
        return trackingRoutes(req, res);
    }

    if (url.startsWith("/Vehiculo")){
        return vehiculoRoutes(req, res);
    }

    if (url.startsWith("/Vuelo")){
        return vueloRoutes(req, res);
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