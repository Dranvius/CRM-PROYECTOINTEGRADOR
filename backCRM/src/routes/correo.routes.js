//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const ListCorreos = Router();
//importar controlador
import {loadEmails} from '../controllers/correos.controller.js';

//Rutas de listClientes   


ListCorreos.put("/correos",loadEmails);


export default ListCorreos;