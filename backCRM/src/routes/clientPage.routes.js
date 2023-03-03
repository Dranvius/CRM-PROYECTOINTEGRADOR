//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const ListClients = Router();
//importar controlador
import {Taerclientes,CrearClient,EditarCliente,EliminarCliente,AllClientesOrdenados} from '../controllers/controladorClientsList.controller.js';

//Rutas de listClientes   

ListClients.get("/clientdats",Taerclientes);
ListClients.post("/newClient",CrearClient);
ListClients.post("/editClient",EditarCliente);
ListClients.post("/deletClient",EliminarCliente);
ListClients.get('/clientesorden',AllClientesOrdenados)

export default ListClients;