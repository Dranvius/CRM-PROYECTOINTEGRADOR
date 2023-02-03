import { NavbarLinks } from "../components/NavbarLinks";

//Botones toaster
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


  const cambioName = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Saludo desde toaster :\n",
      iconColor: "yellow",
      icon: "question",
      color: "green",
      width: "35%",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "Confirmar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      background: "white",
      footer:
        "<center><b>RECUERDA</b><br>EL NOMBRE PUEDE AFECTAR EN EL LOGIN</center>",

      html:
        '<input id="swal-input1" className="swal2-input" placeholder="Nuevo Nombre">' +
        '<input id="swal-input2" className="swal2-input" placeholder="Nuevo Apellido">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });


    if (formValues) {

        Swal.fire({
          icon: "success",
          title: formValues,
          confirmButtonColor: "green",
        });


      } 

    // if (formValues) {
    //   try {
    //     formValues.push(profile.email);
    //     console.log(formValues);
    //     const peticion = await axios.post("/cambiarNombre", formValues);

    //     Swal.fire({
    //       icon: "success",
    //       title: "Finalizado con exito",
    //       confirmButtonColor: "green",
    //     });

    //     navigate("/profile");

    //     console.log(peticion);
    //   } catch (error) {
    //     console.log(error);

    //     Swal.fire({
    //       title: "ALGO SALIO MAL",
    //       confirmButtonColor: "red",
    //       footer: "<center>INFORMAR AL AREA DE SISTEMAS</center>",
    //       color: "black",
    //       width: "20%",
    //       icon: "error",
    //     });
    //   }
    // }
  };


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
