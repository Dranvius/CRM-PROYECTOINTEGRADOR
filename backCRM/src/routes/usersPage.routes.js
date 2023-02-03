//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const ListUsers = Router();
//importar controlador
import {AllDats,EliminarUsario} from '../controllers/controladorUsersList.controller.js';

//Rutas de listUsers

ListUsers.get("/userdats",AllDats);
ListUsers.post("/eliminarusuario",EliminarUsario);


export default ListUsers;
