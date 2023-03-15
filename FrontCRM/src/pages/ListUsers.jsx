import { NavbarLinks } from "../components/NavbarLinks";
import axios from "../lib/axios";
//Botones toaster
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FaBeer } from "react-icons/fa";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";
import { TableList } from "../components/TableList";
import { useAuthStore } from "../storage/globalStorage.js";

//const element = <FontAwesomeIcon icon={faComment} />;



export function ListUsers(props) {

  const profile = useAuthStore((state) => state.user);


  const profileStatus = profile.status;


  const CrearUsu = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Crear nuevo Usuario :\n",
      iconColor: "#447AD3",
      icon: "info",
      color: "#447AD3",
      width: "35%",
      confirmButtonColor: "#1EB837",
      confirmButtonAriaLabel: "Agregar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#dc3545",
      background: "white",
      footer:
        "<center><b>¡¡RECUERDA!!</b><br>Tipo Activo es para usuario Administrador Desactivado es para usuario Gestor</center>",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Cedula">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Celular">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Correo Electronico">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Contraseña">' +
        '<input id="swal-input7" class="swal2-input" placeholder="Tipo">' +
        '<input id="swal-input8" class="swal2-input" placeholder="Estado">',

      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
          document.getElementById("swal-input6").value,
          document.getElementById("swal-input7").value,
          document.getElementById("swal-input8").value,
        ];
      },
    });

    if (formValues) {

      //peticion al back-end//
      const resultado = await axios.post("/CrearUsu", {
        datos: formValues,
      });
    }
  }

  return (
    <>
      <NavbarLinks page="usuarios" typeUser={profileStatus} />


      <div id="search" className="pt-2">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar Usuario" aria-label="Buscar" />
              <button className=" btn btn-success" type="submit">Filtrar</button>
            </form>
          </div>
        </nav>
      </div>


      <div id="container-users">
        <div id="list-users">
          <TableList ente="usuario" />
        </div>


        <div id="downPartUserList">
          <div id="smallMenu">
            <BsFillChatSquareFill />
            <BsBookFill />


          </div>
          <a
            type="button"
            className="btn btn-success"
            onClick={() => {
              CrearUsu();
            }}
          >
            Crear Usuario
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
