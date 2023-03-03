//Construcciòn sistema de rutas
import { Router } from "express";
//Constante de Route
const ListProducts = Router();
//importar controlador
import {crearProducto, Traerproductos,EditarProduct, EliminarProduct,ResProductos} from '../controllers/controladorProductsList.controller.js';

//Rutas de listClientes   

ListProducts.get("/productsdats",Traerproductos);
ListProducts.post("/newProduct",crearProducto);
ListProducts.post("/editProduct", EditarProduct);
ListProducts.post("/deleteProduct", EliminarProduct);
ListProducts.get("/datosproductos",ResProductos);



export default ListProducts;