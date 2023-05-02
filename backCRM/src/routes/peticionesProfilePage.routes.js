import { Router } from "express";
//import {loginHandler,profileHandler} from '../controllers/autentificacion.controller.js'

//TODO controladores
import {changeName, changePassword, changeEmail} from "../controllers/controladorProfilePage.controller.js";

//?Middlerwares
import { verificador } from "../middlerwares/requerirAutentificador.js";

const profile = Router();

//Exportando rutas

profile.post("/cambiarNombre", verificador, changeName);

profile.post("/cambiarContrasena", verificador, changePassword);

profile.post("/cambiarCorreo", verificador, changeEmail);



export default profile;
