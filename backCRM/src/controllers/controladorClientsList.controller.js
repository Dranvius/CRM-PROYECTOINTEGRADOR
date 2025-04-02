// Importar la base de datos
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";

const pool = new pg.Pool(ConfiguracionA);

// Función para traer datos de cliente
const traerDatosClients = async () => {
  try {
    const queryText = `
      SELECT * FROM client 
      INNER JOIN staff ON staff.id_staff = client.relation_staff 
      INNER JOIN usuario ON usuario.id_staff = staff.id_staff 
      ORDER BY client.id_client
    `;
    const res1 = await pool.query(queryText);
    return res1.rows;
  } catch (error) {
    console.log("Error en la petición");
    console.error(error);
  }
};

// Ruta para traer clientes
export const TraerClientes = async (req, res) => {
  try {
    const resBD = await traerDatosClients();
    res.json(resBD);
  } catch (error) {
    console.log(error);
  }
};

// Función para crear un cliente en la BD
const CrearclienteBD = async (newUser) => {
  try {

    console.log(newUser)

    const creador = [newUser.creador];
    const querytext0 = "SELECT id_staff FROM usuario INNER JOIN personaldats ON personaldats.id_users = usuario.id_users WHERE id_personalid = $1";
    const res0 = await pool.query(querytext0, creador);

    console.log(res0)


    if (res0.rowCount === 0) {
      throw new Error("Usuario creador no encontrado");
    }

    const id_staff = res0.rows[0].id_staff;

    if (!id_staff) {
      throw new Error("El usuario creador no tiene asociado un id_staff");
    }

    
    const querytext1 = `
      INSERT INTO client(firstname, lastname, cc, numbercelphone, mail, statusc, relation_staff) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const creaCliente = [
      newUser.datos[0], // Nombre
      newUser.datos[1], // Apellido
      newUser.datos[2], // Cédula
      newUser.datos[3], // Número
      newUser.datos[4], // Correo
      true,             // Status por defecto true
      id_staff          // Relación staff
    ];

    const res1 = await pool.query(querytext1, creaCliente);
    return res1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Ruta para crear cliente
export const CrearClient = async (req, res) => {
  try {
    await CrearclienteBD(req.body);
    res.send("Cliente Creado");
  } catch (error) {
    res.status(400).send(error.message || "Error al crear cliente");
  }
};

// Función para editar datos de cliente en la BD
const editarBD = async (change) => {
  try {
    const queryText1 = `
      UPDATE client 
      SET firstname = $1, lastname = $2, cc = $3, numbercelphone = $4, mail = $5, statusc = $6 
      WHERE id_client = $7
    `;
    const cambioPersonalDats = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[3],
      change.datos[4],
      change.datos[5] === "true" || change.datos[5] === "Activo",
      change.index
    ];

    const res1 = await pool.query(queryText1, cambioPersonalDats);
    return res1;
  } catch (error) {
    console.error(error);
  }
};

// Ruta para editar cliente
export const EditarCliente = async (req, res) => {
  try {
    await editarBD(req.body);
    res.send("Cliente modificado");
  } catch (error) {
    console.log(error);
  }
};

// Función para eliminar cliente en la BD
const eliminarBD = async (dats) => {
  try {
    const queryText = "UPDATE client SET statusc = false WHERE id_client = $1";
    const ar = [dats];
    const res1 = await pool.query(queryText, ar);
    return res1;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

// Ruta para eliminar cliente
export const EliminarCliente = async (req, res) => {
  try {
    await eliminarBD(req.body.datos);
    res.send("Cliente eliminado");
  } catch (error) {
    console.error(error);
  }
};

// Función para traer todos los datos de clientes ordenados
const BaseDatosClientesOrdenados = async () => {
  try {
    const queryText = "SELECT * FROM client ORDER BY id_client";
    const res1 = await pool.query(queryText);
    return res1;
  } catch (error) {
    console.error(error);
  }
};

// Ruta para traer todos los clientes ordenados
export const AllClientesOrdenados = async (req, res) => {
  try {
    const resBD = await BaseDatosClientesOrdenados();
    res.send(resBD.rows);
  } catch (error) {
    console.log(error);
  }
};
