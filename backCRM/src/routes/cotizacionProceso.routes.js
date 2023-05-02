//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const cotizacionRoutes = Router();
//importar controlador
import {ReqDatosUsuaruioSeleccionado, generarPDF,enviarDatosCotizaciones,llevarInformacionACotizacion} from '../controllers/cotizacion.controller.js'
//Rutas de ListClientes


cotizacionRoutes.post("/cotizacionStart",ReqDatosUsuaruioSeleccionado);
cotizacionRoutes.post("/construccionPDF",generarPDF);
cotizacionRoutes.get("/quotationDats",enviarDatosCotizaciones);
cotizacionRoutes.post("/indiceCotizacion",llevarInformacionACotizacion);


export default cotizacionRoutes;

