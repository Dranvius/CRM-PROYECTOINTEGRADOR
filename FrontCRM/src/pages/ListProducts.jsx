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

  //crear nuevo producto//
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
        `<div style="text-align: left; margin-top: 10px;">
          <label><strong>Descuento : </strong></label><br>
          <input type="radio" id="descuento-5" name="descuento" value="5" checked>
          <label for="descuento-5">5 %</label><br>
          <input type="radio" id="descuento-25" name="descuento" value="25">
          <label for="descuento-25">25 %</label>
        </div>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.querySelector('input[name="descuento"]:checked').value, // ✅ esta línea es clave
        ];
      },
    });
    

    if (formValues) {

      const resultado = await axios.post("/newProduct", {
        datos: formValues,
        creador: profile.id,
      });

      console.log(resultado)      

      if (resultado.status == 200){

        Swal.fire({
          icon: "success",
          title: "Producto creado con éxito",
          text: "El Producto ha sido registrado correctamente.",
          confirmButtonText: "OK",
          allowOutsideClick: false, 
          allowEscapeKey: false, 
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
  

      }else{

        Swal.fire({
          icon: "warning",
          title: "Error al crear el producto",
          text: "No se pudo crear el producto.",
          confirmButtonText: "OK",
          allowOutsideClick: false, 
          allowEscapeKey: false, 
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(); 
          }
        });


      }



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