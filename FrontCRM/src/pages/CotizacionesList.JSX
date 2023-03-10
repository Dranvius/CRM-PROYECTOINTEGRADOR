import { NavbarLinks } from "../components/NavbarLinks";

//Botones toaster
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";

//const element = <FontAwesomeIcon icon={faComment} />;

import { TableList } from "../components/TableList";
import { CrearPDF } from "../components/CrearPDF";

import { useAuthStore } from "../storage/globalStorage.js";

export function CotizacionesList() {
  const profile = useAuthStore((state) => state.user);
  const profileStatus = profile.status;
  

  return (
    <>
      <NavbarLinks page="cotizacion" typeUser={profileStatus} />

      
        <div id="search" className="pt-2">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar Cotización"
                  aria-label="Buscar"
                />
                <button className=" btn btn-success" type="submit">
                  Filtrar
                </button>
              </form>
            </div>
          </nav>
        </div>
      

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
          <nav aria-label="Page navigation align-self-center ">
            <ul className="pagination  ">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
