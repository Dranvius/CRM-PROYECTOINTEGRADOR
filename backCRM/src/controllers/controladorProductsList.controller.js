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
      console.log("Error en la peticiòn");
      console.error(error);
    }
  }
  
  //!req res
  export const Traerproductos = async (req, res) => {
    try {
      const resBD = await traerDatosProducts();
  
      res.json(resBD);
    } catch (error) {
      console.log("Error ruta");
      console.error(error);
    }
  }

//*------------------Crear producto

//---CREAR producto--//
const CrearproductoBD = async (newUser) => {
  try {

    const creador = [newUser.creador]


    const querytext0 = "SELECT * FROM product WHERE id_product = $1";

    const res0 = await pool.query(querytext0,creador);

      console.log(res0.rows);


    const querytext1 = "INSERT INTO product(nameproduct,price,description,discount,status) VALUES ($1,$2,$3,$4,$5)";


    const creaProducto = [

        newUser.datos[0], //nombre
        newUser.datos[1], //precio
        newUser.datos[2], //descripcion
        newUser.datos[3],//descuento
        newUser.datos[4] == "Activo" ? true : false
        
        
      ];
    

     const res1 = await pool.query(querytext1,creaProducto);
     return res1;
  } catch (error) {
    console.log("Error ruta");
    console.error(error);
  }
  
};


//Ruta req y res crear de usuario//
  export const crearProducto= async (req, res) => {
  try {

    const resBD = await CrearproductoBD(req.body);
    console.log(resBD);
  
    res.send("Usario Creado");
  } catch (error) {
    console.log("Error ruta");
    console.error(error);
  }
  };

//Editar producto//

const editarPBD = async (change) => {
  console.log(change);
  try {
    const queryText1 =
    "UPDATE product  SET nameproduct= $1, price = $2, description= $3, discount= $4, status= $5  WHERE  id_product= $6 ";
    
    const cambioProductsDats = [
      change.datos[0],
      change.datos[1],
      change.datos[2],
      change.datos[3],
      change.datos[4]== "Activo" ? true : false,
      change.index,
    ];

    const res1 = await pool.query(queryText1, cambioProductsDats); //--Consulta
      return res1;
    
  } catch (error) {
    console.log("Error ruta");
    console.error(error);
  }
};

//Ruta req y res en editicion de datos//
export const EditarProduct= async (req, res) => {
  
  try {
    
    const resBD = await editarPBD(req.body);
    res.send("Usario modificado");
  } catch (error) {
    console.log("Error ruta");
    console.error(error);
  }
};

  //*-----------------Eliminar user

//!BD
const eliminarP = async (dats) => {
  try {
    const queryText = "UPDATE product SET status = false where id_product = $1";

    const ar = [dats];
    console.log(ar)
    const res1 = await pool.query(queryText, ar);

    return res1;
  } catch (error) {
    console.log("Error en la peticiòn");
    console.error(error);
  }
};

//Ruta de respuesta y traida(eliminar user)
export const EliminarProduct = async (req, res) => {
  try {
    const resBD = await eliminarP(req.body.datos);
    res.send("Usario eleminado");
  } catch (error) {
    console.log("Error ruta");
    console.error(error);
  }
};


//*-------Traer datos producto

const BdProducto = async () => {
  try {
    const queryText = "SELECT * FROM  product";

    const peticion = await pool.query(queryText);

    return peticion.rows;
  } catch (error) {
    console.log("Error en la base de dato ");
    console.log(error);
  }
};

export const ResProductos = async (req, res) => {
  try {
    const peticion = await BdProducto();

    console.log(peticion);

    res.json(peticion);
  } catch (error) {
    console.log("Error en el RUTA");
    console.error(error);
  }
};