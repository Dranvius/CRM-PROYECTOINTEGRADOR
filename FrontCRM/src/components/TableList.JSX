//REACT HOOK CONTEXT
import { useContext, useState, useEffect } from "react";
//Constante de contexto de la lista
import { ListsContext } from "../context/ListsContext";
//SweetAlert2
import Swal from "sweetalert2";
//Axios
import axios from "../lib/axios.js";
//Import Dinamict list
import {ListFunction} from '../functions/ListFunction';

//listado de informacion//
export function TableList(props) {
  console.log(props);

  //USE STATE
  //Las variables de react
  const [datos, setDatos] = useState([]);

  //USE CONTEXT

  const ContextoObjetos = useContext(ListsContext);
  console.log(ContextoObjetos);
  //USE EFFECT

  if (props.ente === "usuario") {
    useEffect(() => {
      async function fetchData() {
        try {
          const dats = await ContextoObjetos.datosListUsuario();
          setDatos(dats);
        } catch (err) {
          console.log(err);
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
          console.log(err);
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
          console.log(err)
        }
      }
      fetchData();
    },[]);

  }else if(props.ente === "cotizacion"){
   
    useEffect(() =>{
      async function fetchData() {
        try {
          const dats = await ContextoObjetos.datosListCotizacion();

          console.log(dats)

          setDatos(dats);
        } catch (err) {
          console.log(err)
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
