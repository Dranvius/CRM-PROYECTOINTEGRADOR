//Base de datos
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";

import { encrypt } from "../helpers/encryptThem.js";

const pool = new pg.Pool(ConfiguracionA);

//*-----------------Traer datos

//!BD
const traerDatosUsers = async () => {
  try {
    const queryText =
      "SELECT * FROM usuario INNER JOIN personaldats ON personaldats.id_personalid = usuario.id_users ORDER BY personaldats.id_personalid ";

    const res1 = await pool.query(queryText);

    return res1;
  } catch (error) {
    console.error(error);
  }
};

//Ruta de respuesta y traida(traer datos)
export const AllDats = async (req, res) => {
  try {
    const resBD = await traerDatosUsers();

    res.json(resBD.rows);
  } catch (error) {
    console.error(error);
  }
};

//*-----------------Eliminar user

//!BD
const eliminar = async (dats) => {
  try {
    const queryText = "UPDATE usuario SET statusu = false where id_users = $1";

    const ar = [dats];

    const res1 = await pool.query(queryText, ar);

    return res1;
  } catch (error) {}
};

//Ruta de respuesta y traida(eliminar user)
export const EliminarUsario = async (req, res) => {
  try {
    const resBD = await eliminar(req.body.datos);
    res.send("Usario eleminado");
  } catch (error) {
    console.error(error);
  }
};

//-----editar datos personales---///

// conexion de edicion de datos en BD//

const editar = async (change) => {
  try {
    const queryText1 =
      "UPDATE  SET firstname = $1, lastname = $2, cc= $3, numbercelphone=$4 WHERE id_personalid = $5";

    const cambioPersonalDats = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[4],
      change.index,
    ];

    const res1 = await pool.query(queryText1, cambioPersonalDats); //--Consulta

    const queryText2 =
      "UPDATE usuario SET email = $1, pass = $2, tipo= $3, status=$4 WHERE id_users = $5";

    const cambioUser = [
      change.datos[3],
      change.datos[5],
      change.datos[6] == "Activo" ? true : false,
      change.datos[7] == "Activo" ? true : false,
      change.index,
    ];

    const res2 = await pool.query(queryText2, cambioUser);
  } catch (error) {}
};

//Ruta req y res en editicion de datos//
export const EditarUsuario = async (req, res) => {
  try {
    const resBD = await editar(req.body);

    res.send("Usario modificado");
  } catch (error) {}
};

//---CREAR USUARIO--//
const CrearUsuBD = async (change) => {
  try {
    const querytext =
      "INSERT INTO personaldats (firstname , lastname , cc , numbercelphone) VALUES ($1,$2,$3,$4)";

    console.log(change);

    const creaUs = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[3],
    ];

    const querytext1 =
      "INSERT INTO  usuario (email,pass,tipo,statusu) VALUES ( $1, $2, $3, $4)";

    const creaUsu2 = [
      change.datos[4],
      await encrypt(change.datos[5]),
      change.datos[6] === "true",
      (change.datos[7] = true),
    ];

    const res2 = await pool.query(querytext1, creaUsu2);

    const res1 = await pool.query(querytext, creaUs);

    return 1;
  } catch (error) {
    console.error(error);
  }
};

//Ruta req y res crear de usuario//
export const CrearUsu = async (req, res) => {
  try {
    const resBD = await CrearUsuBD(req.body);
    res.send("Usario Creado" + resBD);
  } catch (error) {
    console.error(error);
  }
};
