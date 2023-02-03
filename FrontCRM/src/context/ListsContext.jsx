import { createContext } from "react";
import img from '../img/logo.png'
import { useState, useEffect } from "react";
import Axios from '../lib/axios'
//!Exportaciones

export const ListsContext = createContext();

async function datosList (){

  try {

      const peticion = await Axios.get('/userdats');

      return peticion.data;
      
  } catch (error) {
      console.error(error)
  }
}
  

// //Llamando la funcion

export function ListsContextProvider(props) {


  return (
    <ListsContext.Provider value={
      datosList
    }>
      {props.children}
    </ListsContext.Provider>
  );
}
