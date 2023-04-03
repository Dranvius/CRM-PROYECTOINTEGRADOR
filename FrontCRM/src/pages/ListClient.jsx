import { NavbarLinks } from "../components/NavbarLinks";
import  axios  from "../lib/axios";

//Botones toaster
import Swal from "sweetalert2";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";
import { useAuthStore } from "../storage/globalStorage.js"; 
import { TableList } from "../components/TableList";
import {useState,useRef} from 'react'
import { PagNavigate } from "../components/pagNavigate";


//const element = <FontAwesomeIcon icon={faComment} />;


export function ListClient(props) {
  
  const profile = useAuthStore((state) => state.user);
  const referencia = useRef();
  const profileStatus = profile.status;

  //crear nuevo cliente//
  const CrearUsu = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Crear nuevo Cliente :\n",
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
        "<center>¡¡RECUERDE!!<br/> El estado Activo para  nuevo cliente y   Desactivado para  eliminar <br></center>",

      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Nuevo Apellido">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Nueva Cedula">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Nuevo Correo Electronico">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Nuevo Celular">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Nuevo Estatus">',
        

      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
          document.getElementById("swal-input6").value,
          
        ];
      },
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));

      const resultado = await axios.post("/newClient", {
        datos: formValues,
        creador:profile.id,
      });
    }
  }

  //!PAGINACIÓN

  const [datosPorProceso,datosPorProcesoSet] = useState(5);

    const cambioPag = () =>{
        return allDats.slice(datosPorProceso,datosPorProceso+5)
    }
    

    const nextPage = () =>{
        datosPorProcesoSet(datosPorProceso+5)
    }

    const backPage = () =>{
        datosPorProcesoSet(datosPorProceso-5)
    }


    
    console.log(referencia)
    return (
      <>

        <NavbarLinks page='clientes' typeUser={profileStatus} />
        <div id="search" className="pt-2">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Buscar Cliente" aria-label="Buscar" />
                <button className=" btn btn-success" type="submit">Filtrar</button>
              </form>
            </div>
          </nav>
        </div>
        
        <div id="container-users">
          <div id="list-users">
            <TableList ente="cliente" />
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
              <ul className="pagination">
                <li className="page-item disabled" ref={referencia}>
                  <button className="page-link" >
                    Previous
                  </button>
                </li>
                <li className="page-item" id="siguientes">
                  <button className="page-link"  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
}
