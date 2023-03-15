//REACT HOOK CONTEXT
import { useContext, useState, useEffect } from "react";
//Constante de contexto de la lista
import { ListsContext } from "../context/ListsContext";
//Import Dinamict list
import {ListFunction} from '../functions/ListFunction';

//listado de informacion//
export function TableList(props) {
  

  //USE STATE
  //!Las variables de react
  const [datos, setDatos] = useState([]);

  //!USE CONTEXT
  const ContextoObjetos = useContext(ListsContext);
  

  //!USE EFFECT
  if (props.ente === "usuario") {

    useEffect(() => {
      async function fetchData() {
        try {
          const dats = await ContextoObjetos.datosListUsuario();
          setDatos(dats);
        } catch (err) {
          
        }
      }
      fetchData();
    }, []);

  

  } else if (props.ente === "cliente") {
    useEffect(() => {
      async function fetchData() {
        try {
          const dats = await ContextoObjetos.datosListCliente();
          setDatos(dats);
        } catch (err) {
          
        }
      }
      fetchData();
    }, []);

    
  }  else if (props.ente === "producto"){
    useEffect(() =>{
      async function fetchData() {
        try {
          const dats = await ContextoObjetos.datosListProducto();
          setDatos(dats);
        } catch (err) {
          
        }
      }
      fetchData();
    },[]);

  }else if(props.ente === "cotizacion"){
   
    useEffect(() =>{
      async function fetchData() {
        try {
          const dats = await ContextoObjetos.datosListCotizacion();

          

          setDatos(dats);
        } catch (err) {
          
        }
      }
      fetchData();
    },[]);
  }

  

  return (
    <>
      <ListFunction prop={props.ente} datos={datos} />
    </>
  );
}
