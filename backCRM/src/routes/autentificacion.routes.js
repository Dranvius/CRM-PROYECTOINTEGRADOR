import {Router} from 'express';
//TODO: Controladores
import {loginHandler,profileHandler} from '../controllers/autentificacion.controller.js'
import {verificador} from '../middlerwares/requerirAutentificador.js'
//*Ejecuciòn de la funciòn ROTER (LINEA_1)
const router = Router();


router.post('/login',loginHandler); //*GENERAMOS TOKEN

router.get('/login',verificador,profileHandler)

//!Exportando rutas
export default router;