import { NavbarLinks } from '../components/NavbarLinks';
import { TableList } from '../components/TableList.jsx';
import { useAuthStore } from "../storage/globalStorage.js";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "../lib/axios";


export function ListProducts(props) {

  const profile = useAuthStore((state) => state.user);

  const profileStatus = profile.status;

  //crear nuevo cliente//
  const CrearUsu = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Crear nuevo Producto  :\n",
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
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Producto">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Precio">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Descripcion">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Descuento">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Status">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,

        ];
      },
    });

    if (formValues) {


      const resultado = await axios.post("/newProduct", {
        datos: formValues,
        creador: profile.id,
      });
    }
  }

  return (
    <>
      <NavbarLinks page='productos' typeUser={profileStatus} />
      <div id="container-users">
        <div id="list-users">
          <TableList ente="producto" />
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
            Crear Producto
          </a>

        </div>
      </div>
    </>
  );

}