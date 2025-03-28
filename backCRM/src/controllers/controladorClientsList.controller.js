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
      INNER JOIN usuario ON usuario.id_users = staff.id_staff 
      ORDER BY client.id_client
    `;
    const res1 = await pool.query(queryText);
    return res1.rows;
  } catch (error) {
    console.log("Error en la petición");
    console.error(error);
  }
}

// Ruta para traer clientes
export const TraerClientes = async (req, res) => {
  try {
    const resBD = await traerDatosClients();
    res.json(resBD);
  } catch (error) {
    console.log(error);
  }
}

// Función para crear un cliente en la BD
const CrearclienteBD = async (newUser) => {
  try {
    const creador = [newUser.creador];
    const querytext0 = "SELECT * FROM usuario WHERE id_users = $1";
    const cantidad = "SELECT count(*) FROM client";
    const res_00 = await pool.query(cantidad)
    const res0 = await pool.query(querytext0, creador);

    const querytext1 = `
      INSERT INTO client(id_client,firstname, lastname, cc, numbercelphone, mail, statusc, relation_staff) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const creaCliente = [
      res_00.rows[0].count + 1,
      newUser.datos[0], // Nombre
      newUser.datos[1], // Apellido
      newUser.datos[2], // Cédula
      newUser.datos[3], // Correo
      newUser.datos[4], // Número
      newUser.datos[5] = true, // Status
      res0.rows[0].id_users // Relación staff
    ];

    const res1 = await pool.query(querytext1, creaCliente);
    return res1;
  } catch (error) {
    console.error(error);
  }
};

// Ruta para crear cliente
export const CrearClient = async (req, res) => {
  try {
    await CrearclienteBD(req.body);
    res.send("Cliente Creado");
  } catch (error) {
    console.error(error);
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
      change.datos[5],
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
    

    const queryText = "UPDATE client SET statusc = False WHERE id_client = $1";
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
    const queryText = "SELECT * FROM client";
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
