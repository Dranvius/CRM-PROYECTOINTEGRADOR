import { NavbarLinks } from "../components/NavbarLinks";
import {useState,useEffect,createContext} from 'react'
//Botones toaster
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";

//const element = <FontAwesomeIcon icon={faComment} />;
import { TableList } from "../components/TableList.jsx";
import { CrearPDF } from "../components/CrearPDF";
import { useAuthStore } from "../storage/globalStorage.js";
//!Importación del contexto
import {ListsContext} from '../context/ListsContext'


export function CotizacionesList() {
  const profile = useAuthStore((state) => state.user);
  const [datosCliente,setDatosCliente] = useState([]);
  const contexto = createContext(ListsContext);
  const profileStatus = profile.status;
  

  //!Más datos y los botones es encesario

  return (
    <>
      <NavbarLinks page="cotizacion" typeUser={profileStatus} />

      
      <div id="container-users">
        <div id="list-users">
          <TableList ente="cotizacion" />
        </div>

        <div id="downPartUserList">
          <div id="smallMenu">
            <BsFillChatSquareFill />
            <BsBookFill />
          </div>
          <CrearPDF />
        </div>
      </div>
    </>
  );
}
