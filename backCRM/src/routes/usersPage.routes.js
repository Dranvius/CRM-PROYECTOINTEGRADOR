//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const ListUsers = Router();
//importar controlador
import {AllDats,EliminarUsario,EditarUsuario,CrearUsu} from '../controllers/controladorUsersList.controller.js';

//Rutas de listUsers

ListUsers.get("/userdats",AllDats);
ListUsers.post("/eliminarusuario",EliminarUsario);
ListUsers.post("/editUsers",EditarUsuario);
ListUsers.post("/CrearUsu",CrearUsu);


export default ListUsers;
