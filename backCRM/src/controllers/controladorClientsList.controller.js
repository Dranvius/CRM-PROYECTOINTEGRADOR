//Base de datos
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";

const pool = new pg.Pool(ConfiguracionA);

//*-----------------Traer datos cliente

//!BD
const traerDatosClients = async () => {
  try {
    const queryText =
      'SELECT * FROM  client INNER JOIN staff ON staff.id_staff = client.relation_staff INNER JOIN usuario ON usuario.id_users  =  staff.id_staff ORDER BY client.id_client ';
    const res1 = await pool.query(queryText);

    return res1.rows;
  } catch (error) {
    console.log("Error en la peticiòn");
    console.error(error);
  }
}

//!req res
export const Taerclientes = async (req, res) => {
  try {
    const resBD = await traerDatosClients();

    res.json(resBD);
  } catch (error) {
    
  }
}


//*------------------Crear cliente

//---CREAR USUARIO--//
const CrearclienteBD = async (newUser) => {
  try {

    const creador = [newUser.creador]
    const querytext0 = "SELECT * FROM usuario  WHERE id_users = $1 ";
    const res0 = await pool.query(querytext0, creador);




    const querytext1 = "INSERT INTO client(firstname,lastname,cc,numbercelphone,mail,statusc,relation_staff) VALUES ($1,$2,$3,$4,$5,$6,$7)";
    const creaCliente = [

      newUser.datos[0], //nombre
      newUser.datos[1], //apellido
      newUser.datos[2], //cedula
      newUser.datos[3], //correo
      newUser.datos[4], //numero
      newUser.datos[5] == "Activo" ? true : false, //status
      res0.rows[0].id_users //relation staff
    ];


    const res1 = await pool.query(querytext1, creaCliente);
    return res1;
  } catch (error) {
    console.error(error);
  }

};


//Ruta req y res crear de usuario//
export const CrearClient = async (req, res) => {
  try {

    const resBD = await CrearclienteBD(req.body);
    res.send("Cliente Creado");
  } catch (error) {
    console.error(error);
  }
};




//*-----------------EDITAR CLIENTE-----/////



// conexion de edicion de datos en BD//

const editarBD = async (change) => {

  try {
    const queryText1 =
      "UPDATE client  SET firstname = $1, lastname = $2, cc= $3, numbercelphone= $4, mail= $5, statusc= $6 WHERE id_client= $7  ";

    const cambioPersonalDats = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[3],
      change.datos[4],
      change.datos[5] == "Activo" ? true : false,
      change.index,
    ];

    const res1 = await pool.query(queryText1, cambioPersonalDats); //--Consulta
    return res1;

  } catch (error) {
    console.error(error);
  }
};

//Ruta req y res en editicion de datos//
export const EditarCliente = async (req, res) => {

  try {

    const resBD = await editarBD(req.body);
    res.send("Cliente modificado");
  } catch (error) {

  }
};

//*-----------------Eliminar Cliente

//!BD
const eliminarBD = async (dats) => {
  try {
    const queryText = "UPDATE Client SET statusc = false WHERE id_client = $1";

    const ar = [dats];

    const res1 = await pool.query(queryText, ar);

    return res1;
  } catch (error) {

  }
};

//Ruta de respuesta y traida
export const EliminarCliente = async (req, res) => {
  try {
    const resBD = await eliminarBD(req.body.datos);
    res.send("Cliente eliminado");
  } catch (error) {
    console.error(error);
  }
};


//!------------------------------------------Datos cliente

const BaseDatosClientesOrdenados = async () => {
  try {
    const queryText = "SELECT firstname,lastname FROM client";
    const res1 = await pool.query(queryText);

    return res1;
  } catch (error) {
    console.error(error);
  }
};

export const AllClientesOrdenados = async (req, res) => {
  try {
    const resBD = await BaseDatosClientesOrdenados();

    res.send(resBD.rows);
  } catch (error) {

  }
};





