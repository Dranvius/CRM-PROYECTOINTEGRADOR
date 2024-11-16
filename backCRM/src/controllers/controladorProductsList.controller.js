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
  }
}

//*------------------Crear producto

//---CREAR producto--//
const CrearproductoBD = async (newUser) => {
  try {

    const creador = [newUser.creador]

    const querytext0 = "SELECT * FROM product WHERE id_product = $1";

    const res0 = await pool.query(querytext0, creador);

    const querytext1 = "INSERT INTO product(nameproduct,price,description,discount,statusp) VALUES ($1,$2,$3,$4,$5)";

    const creaProducto = [

      newUser.datos[0], //nombre
      newUser.datos[1], //precio
      newUser.datos[2], //descripcion
      newUser.datos[3],//descuento
      newUser.datos[4] = true


    ];


    const res1 = await pool.query(querytext1, creaProducto);
    return res1;
  } catch (error) {
    
  }

};


//Ruta req y res crear de usuario//
export const crearProducto = async (req, res) => {
  try {

    const resBD = await CrearproductoBD(req.body);

    res.send("Producto Creado");
  } catch (error) {

  }
};

//Editar producto//

const editarPBD = async (change) => {

  try {
    const queryText1 =
      "UPDATE product  SET nameproduct= $1, price = $2, description= $3, discount= $4, statusp= $5  WHERE  id_product= $6 ";

    const cambioProductsDats = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[3],
      change.datos[4] == "Activo" ? true : false,
      change.index,
    ];

    const res1 = await pool.query(queryText1, cambioProductsDats); //--Consulta
    return res1;

  } catch (error) {
  
  }
};

//Ruta req y res en editicion de datos//
export const EditarProduct = async (req, res) => {

  try {

    const resBD = await editarPBD(req.body);
    res.send("Producto modificado");
  } catch (error) {

  }
};

//*-----------------Eliminar user

//!BD
const eliminarP = async (dats) => {
  try {
    const queryText = "UPDATE product SET statusp = false where id_product = $1";

    const ar = [dats];

    const res1 = await pool.query(queryText, ar);

    return res1;
  } catch (error) {

  }
};

//Ruta de respuesta y traida(eliminar user)
export const EliminarProduct = async (req, res) => {
  try {
    const resBD = await eliminarP(req.body.datos);
    res.send("Producto eliminado");
  } catch (error) {

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