import { createContext } from "react";
import img from '../img/logo.png'
import { useState, useEffect } from "react";
import axios from 'axios'
//!Exportaciones

export const ParquesContext = createContext();

export function ParquesContextProvider(props) {
  /*
    !Use state
    *Use Effect
  */

    // const[informacion,setInformacion] = useState([])

    // useEffect()




  //Funciones logicas en el frontEnd

 const a = 0


  return (
    <ParquesContext.Provider value={
      img
    }>
      {props.children}
    </ParquesContext.Provider>
  );
}
