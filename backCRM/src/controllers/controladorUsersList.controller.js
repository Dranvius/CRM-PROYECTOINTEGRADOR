// Base de datos
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";
import { encrypt } from "../helpers/encryptThem.js";

const pool = new pg.Pool(ConfiguracionA);

//*-----------------Traer datos
const traerDatosUsers = async () => {
  try {
    const queryText =
      "SELECT * FROM usuario INNER JOIN personaldats ON personaldats.id_users = usuario.id_users ORDER BY personaldats.id_personalid";
    const res1 = await pool.query(queryText);
    return res1;
  } catch (error) {
    console.error(error);
  }
};

export const AllDats = async (req, res) => {
  try {
    const resBD = await traerDatosUsers();
    res.json(resBD.rows);
  } catch (error) {
    console.error(error);
  }
};

//*-----------------Eliminar user
const eliminar = async (dats) => {
  try {
    const queryText = "UPDATE usuario SET status = false WHERE id_users = $1";
    const ar = [dats];
    const res1 = await pool.query(queryText, ar);
    return res1;
  } catch (error) {
    console.error(error);
  }
};

export const EliminarUsario = async (req, res) => {
  try {
    const resBD = await eliminar(req.body.datos);
    res.send("Usuario eliminado");
  } catch (error) {
    console.error(error);
  }
};

//-----Editar datos personales---///
const editar = async (change) => {
  try {
    const queryText1 =
      "UPDATE personaldats SET firstname = $1, lastname = $2, cc= $3, numbercelphone=$4 WHERE id_personalid = $5";

    const cambioPersonalDats = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[4],
      change.index,
    ];

    await pool.query(queryText1, cambioPersonalDats);

    const queryText2 =
      "UPDATE usuario SET email = $1, pass = $2, tipo= $3, status=$4 WHERE id_users = $5";

    const cambioUser = [
      change.datos[3],
      await encrypt(change.datos[5]),
      change.datos[6] === "true" || change.datos[6] === "Activo",
      change.datos[7] === "true" || change.datos[7] === "Activo",
      change.index,
    ];

    await pool.query(queryText2, cambioUser);
  } catch (error) {
    console.error(error);
  }
};

export const EditarUsuario = async (req, res) => {
  try {
    await editar(req.body);
    res.send("Usuario modificado");
  } catch (error) {
    console.error(error);
  }
};

//---CREAR USUARIO--//
const CrearUsuBD = async (change) => {
  try {
    const creaUsu2 = [
      change.datos[4],                                 // email
      await encrypt(change.datos[5]),                  // password encriptada
      change.datos[6] === "true",                      // tipo (booleano)
      true                                             // status
    ];

    const querytext1 =
      "INSERT INTO usuario (email, pass, tipo, status) VALUES ($1, $2, $3, $4) RETURNING id_users";

    const res1 = await pool.query(querytext1, creaUsu2);
    const id_users = res1.rows[0].id_users;

    const creaUs = [
      change.datos[0], // firstname
      change.datos[1], // lastname
      change.datos[2], // cc
      change.datos[3], // numbercelphone
      id_users         // id_users FK
    ];

    const querytext =
      "INSERT INTO personaldats (firstname , lastname , cc , numbercelphone, id_users) VALUES ($1,$2,$3,$4,$5)";

    await pool.query(querytext, creaUs);

    return 1;
  } catch (error) {
    console.error(error);
  }
};

export const CrearUsu = async (req, res) => {
  try {
    const resBD = await CrearUsuBD(req.body);
    res.send("Usuario Creado " + resBD);
  } catch (error) {
    console.error(error);
  }
};
