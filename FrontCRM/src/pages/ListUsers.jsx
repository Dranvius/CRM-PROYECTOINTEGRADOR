import { NavbarLinks } from "../components/NavbarLinks";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faComment } from "@fortawesome/free-solid-svg-icons";

import { FaBeer } from 'react-icons/fa';
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";

const element = <FontAwesomeIcon icon={faComment} />;

import {TableList} from '../components/TableList'

export function ListUsers() {
  //const ContextoVariableFuncional = useContext(ProyectoContext);

  

    return (
      <>
        <NavbarLinks />

        <div id="search" className="pt-4">
          <form className="form-inline justify-content-end">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                🔎
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Cédula"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </form>
        </div>

        <div id="container-users">
          <div id="list-users">

          <TableList/>

          </div>

          <div id="downPartUserList">
                <div id="smallMenu">
                <BsFillChatSquareFill/> 
                
                <BsBookFill/>
                </div>
                <a type="button" className="btn btn-success" onClick={() => {cambioName()}}>
                  Crear
                </a>
              

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
