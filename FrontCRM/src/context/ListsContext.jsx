import { createContext } from "react";
import Axios from '../lib/axios'
//!Exportaciones


export const ListsContext = createContext();


//!Punto de referencia

async function datosListUsuario (){

  try {
      const peticion = await Axios.get('/userdats');

      return peticion.data;
  } catch (error) {
      
  }
}

async function datosListCliente (){

  try {
      const peticion = await Axios.get('/clientdats'); //SELECTS

      return peticion.data;
  } catch (error) {
      
  }
}

async function datosListProducto (){

  try {
      const peticion = await Axios.get('/productsdats'); //SELECTS

      return peticion.data;
  } catch (error) {
   
  }
}

async function datosListCotizacion (){

  try {
      const peticion = await Axios.get('/quotationDats'); //SELECTS

      

      return peticion.data;
  } catch (error) {
      
  }
}

//!Traer datos de clientes solo el nombre y datos importantes

async function datosClienteOrden() {
  try {
    const peticion = await Axios.get("/clientesorden");

    return peticion.data;
  } catch (error) {
    
  }
}

async function datosProductos() {
  try {
    const peticion = await Axios.get("/datosproductos");
    return peticion.data;
  } catch (error) {
    
  }
}

//!Taer datos respeto a id de dcotización

const cotizacionDatos =  async (indice) =>{
  
  //nombre cliente
  //Apellido del cliente
  //Telefono del cliente
  //Cédula del cliente
  //Correo del Cliente
  //Datos de cotización
  try {
    const datos = await Axios.post('/indiceCotizacion',{
      indice
    })

    

    return datos.data;

  } catch (error) {
    console.error(error)
  }
}

  
const envio = {
  datosListUsuario,
  datosListCliente,
  datosListProducto,
  datosListCotizacion,
  datosClienteOrden,
  datosProductos,
  cotizacionDatos,
}





export function ListsContextProvider(props) {


  return (
    <ListsContext.Provider value={
      envio
    }>
      {props.children}
    </ListsContext.Provider>
  );
}



