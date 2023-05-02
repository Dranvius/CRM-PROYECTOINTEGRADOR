import pg from "pg";
import { ConfiguracionA } from "../database/config.js";
import { encrypt } from "../helpers/encryptThem.js";
const pool = new pg.Pool(ConfiguracionA);

//*-------------------- Peticiones profile Page

//*--------------------------------------------------------------------------------Name

//!Cambiar nombre Base de datos

const modificarNombre = async (dats) => {
  try {
    const queryText1 =
      "UPDATE personaldats SET firstname = $1, lastname = $2  WHERE cc = $3";

    const res1 = pool.query(queryText1, dats);

    return res1;
  } catch (error) {
    console.log(error);
  }
};

//Cambiar nombre Ruta

export const changeName = (req, res) => {
  try {
    modificarNombre(req.body);
    res.send("Operación realizada");
  } catch (error) {
    console.log(error);
  }
};

//*--------------------------------------------------------------------------------Password

//!Cambiar Contraseña Base de datos

const modificarContraseña = async (dats) => {
  try {
    const queryText1 = "UPDATE usuario SET pass = $1  WHERE email = $2";

    const res1 = pool.query(queryText1, dats);

    return res1;
  } catch (error) {
    console.log(error);
  }
};

//?Cambiar contraseña Ruta

export const changePassword = async (req, res) => {
  //!Encriptación contraseña

  req.body[0] = await encrypt(req.body[0]);

  try {
    modificarContraseña(req.body);
    res.send("Operación realizada");
  } catch (error) {}
};

//-----------------------------------------------------------------------------------

//!Cambiar correo base de datos (Controlador)

const cambioEmail = async (dats) => {
  try {
    const queryText = "UPDATE usuario SET email = $1 WHERE email = $2";

    const res = pool.query(queryText, dats);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Cambiar correo ruta

export const changeEmail = async (req, res) => {
  try {
    cambioEmail(req.body);

    res.send("Nombre operación realizada");
  } catch (error) {}
};
