//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const ListClients = Router();
//importar controlador
import {TraerClientes,CrearClient,EditarCliente,EliminarCliente,AllClientesOrdenados} from '../controllers/controladorClientsList.controller.js';
import { verificador } from "../middlerwares/requerirAutentificador.js";
//Rutas de listClientes   

ListClients.get("/clientdats",TraerClientes);
ListClients.post("/newClient",CrearClient);
ListClients.post("/editClient",EditarCliente);
ListClients.post("/deletClient",verificador,EliminarCliente);
ListClients.get('/clientesorden',AllClientesOrdenados)

export default ListClients;