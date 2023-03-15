import pg from 'pg';
import { ConfiguracionA } from '../database/config.js';
const pool = new pg.Pool(ConfiguracionA)
//*-------------------- Peticiones profile Page


//*--------------------------------------------------------------------------------Name

//!Cambiar nombre Base de datos

const modificarNombre = async (dats) => {
  try {
    const queryText1 =
      "UPDATE usuario SET nombre = $1, apellido = $2  where correo = $3";

    const res1 = pool.query(queryText1, dats);

  } catch (error) {

  }
};

//Cambiar nombre Ruta

export const changeName = (req, res) => {

  res.send("Nombre cambiado");
  try {
    modificarNombre(req.body);
    res.send("Operación realizada");
  } catch (error) {

  }
};




//*--------------------------------------------------------------------------------Password 

//!Cambiar Contraseña Base de datos

const modificarContraseña = async (dats) => {
  try {
    const queryText1 =
      "UPDATE usuario SET passworduser = $1  where correo = $2";

    const res1 = pool.query(queryText1, dats);

  } catch (error) {

  }
};

//?Cambiar contraseña Ruta

export const changePassword = (req, res) => {
  console.log("Peticion de cambio de contraseña");

  res.send("Nombre cambiado");
  try {
    modificarContraseña(req.body);
    res.send("Operación realizada");
  } catch (error) {

  }
};
