import {Router} from 'express';
import {loginHandler,profileHandler} from '../controllers/autentificacion.controller.js'
import {verificador} from '../middlerwares/requerirAutentificador.js'
const router = Router();

//Exportando rutas
router.post('/login',loginHandler);

router.get('/login',verificador,profileHandler)

export default router;


