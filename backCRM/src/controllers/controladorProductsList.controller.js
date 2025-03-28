import pg from "pg";
import { ConfiguracionA } from "../database/config.js";

const pool = new pg.Pool(ConfiguracionA);


//BG--traer datos del producto


const traerDatosProducts = async () => {
  try {
    const queryText =
      'SELECT * FROM  product  ORDER BY product.id_product';
    const res1 = await pool.query(queryText);

    return res1.rows;
  } catch (error) {
  }
}

//!req res
export const Traerproductos = async (req, res) => {
  try {
    const resBD = await traerDatosProducts();

    res.json(resBD);

  } catch (error) {
    console.log(error)
  }
}

//*------------------Crear producto

//---CREAR producto--//
const CrearproductoBD = async (newUser) => {
  try {

    const querytext1 = "INSERT INTO product(nameproduct,price,description,discount,status) VALUES ($1,$2,$3,$4,$5)";

    const creaProducto = [
      newUser.datos[0], //nombre
      newUser.datos[1], //precio
      newUser.datos[2], //descripcion
      newUser.datos[3], //descuento
      true
    ];

    const res1 = await pool.query(querytext1, creaProducto);

    return res1;
  } catch (error) {
    return error;
  }

};


export const crearProducto = async (req, res) => {
  try {
    const resBD = await CrearproductoBD(req.body);

    // Validamos si no hubo error en la BD
    if (resBD?.severity !== "ERROR") {
      return res.status(200).send({ message: "Producto creado exitosamente" });
    }

    // Si hubo un error (aunque no lanzó excepción)
    return res.status(400).send({
      message: "Error al crear el producto en la base de datos",
      detalle: resBD?.message || "Error desconocido",
    });

  } catch (error) {
    console.error("Error interno al crear producto:", error);

    return res.status(500).send({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

//Editar producto//

const editarPBD = async (change) => {
  try {
    const queryText =
      "UPDATE product SET nameproduct = $1, price = $2, description = $3, discount = $4, status = $5 WHERE id_product = $6";

    const values = [
      change.datos.nameproduct,
      change.datos.price,
      change.datos.description,
      change.datos.discount,
      change.datos.status,
      change.index,
    ];

    const result = await pool.query(queryText, values);
    return result;
  } catch (error) {
    console.error("❌ Error en editarPBD:", error);
    throw error;
  }
};



export const EditarProduct = async (req, res) => {
  try {
    const resultado = await editarPBD(req.body);

    if (resultado.rowCount === 0) {
      return res.status(404).send({ message: "Producto no encontrado o sin cambios" });
    }

    return res.status(200).send({ message: "Producto modificado correctamente" });

  } catch (error) {
    console.error("❌ Error en EditarProduct:", error);
    return res.status(500).send({
      message: "Error interno al modificar el producto",
      error: error.message,
    });
  }
};


//*-----------------Eliminar user

const eliminarP = async (idProduct) => {
  try {
    const queryText = "UPDATE product SET status = false WHERE id_product = $1";
    const result = await pool.query(queryText, [idProduct]);
    return result;
  } catch (error) {
    console.error("❌ Error en eliminarP:", error);
    throw error; // Relanza para que lo capture la ruta
  }
};


//Ruta de respuesta y traida(eliminar user)
export const EliminarProduct = async (req, res) => {
  try {
    const resultado = await eliminarP(req.body.datos);

    if (resultado.rowCount === 0) {
      return res.status(404).send({
        message: "Producto no encontrado o ya estaba inactivo",
      });
    }

    return res.status(200).send({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("❌ Error en EliminarProduct:", error);
    return res.status(500).send({
      message: "Error interno al eliminar el producto",
      error: error.message,
    });
  }
};



//*-------Traer datos producto

const BdProducto = async () => {
  try {
    const queryText = "SELECT * FROM  product";

    const peticion = await pool.query(queryText);

    return peticion.rows;
  } catch (error) {

  }
};

export const ResProductos = async (req, res) => {
  try {
    const peticion = await BdProducto();

    res.json(peticion);
  } catch (error) {

  }
};