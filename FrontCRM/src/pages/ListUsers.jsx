import { useEffect, useState } from "react";
import { NavbarLinks } from "../components/NavbarLinks";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import { BsFillChatSquareFill, BsBookFill } from "react-icons/bs";
import { TableList } from "../components/TableList.jsx";
import { useAuthStore } from "../storage/globalStorage.js";

export function ListUsers(props) {
  const profile = useAuthStore((state) => state.user);
  const profileStatus = profile.status;

  

  const [usuarios, setUsuarios] = useState([]); // Estado para la lista de usuarios

  // Función para cargar los usuarios desde el backend
  const cargarUsuarios = async () => {
    try {
      const { data } = await axios.get("/userdats"); // Ruta del backend para obtener usuarios
      setUsuarios(data); // Actualiza el estado con los usuarios
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

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
        "<center><b>¡¡RECUERDA!!</b><br>Selecciona el tipo de usuario: Administrador o Normal</center>",
      html: `
          <div style="margin-bottom: 10px;">
            <label for="swal-input1" style="font-weight: bold;">Información Personal</label>
            <input id="swal-input1" class="swal2-input" placeholder="Nombre">
            <input id="swal-input2" class="swal2-input" placeholder="Apellido">
            <input id="swal-input3" class="swal2-input" placeholder="Cedula">
            <input id="swal-input4" class="swal2-input" placeholder="Celular">
          </div>
          <div style="margin-bottom: 10px;">
            <label for="swal-input6" style="font-weight: bold;">Credenciales</label>
            <input id="swal-input5" class="swal2-input" placeholder="Correo Electronico">
            <input id="swal-input6" class="swal2-input" type="password" placeholder="Contraseña">
          </div>
          <div style="margin-bottom: 10px; text-align: left;">
            <label style="font-weight: bold;">Tipo de Usuario</label><br>
            <label><input type="radio" name="tipoUsuario" value="true"> Administrador</label><br>
            <label><input type="radio" name="tipoUsuario" value="false"> Normal</label>
          </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const tipoSeleccionado = document.querySelector('input[name="tipoUsuario"]:checked');
        if (!tipoSeleccionado) {
          Swal.showValidationMessage("Por favor selecciona el tipo de usuario (Administrador o Normal)");
          return null;
        }
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
          document.getElementById("swal-input6").value,
          tipoSeleccionado.value, // Agregar el tipo seleccionado (true para Administrador o false para Normal)
        ];
      },
    });

    if (formValues) {
      try {
        await axios.post("/CrearUsu", {
          datos: formValues,
        });
        Swal.fire({
          icon: "success",
          title: "Usuario creado con éxito",
          text: "El usuario ha sido registrado correctamente.",
          confirmButtonText: "OK",
          allowOutsideClick: false, 
          allowEscapeKey: false, 
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al crear el usuario.",
        });
      }
    }
  };

  return (
    <>
      <NavbarLinks page="usuarios" typeUser={profileStatus} />

      <div id="container-users">
        <div id="list-users">
          {/* Pasa la lista de usuarios al componente TableList */}
          <TableList ente="usuario" data={usuarios} />
        </div>

        <div id="downPartUserList">
          <div id="smallMenu">
            <BsFillChatSquareFill />
            <BsBookFill />
          </div>
          <a
            type="button"
            className="btn btn-success"
            onClick={CrearUsu}
          >
            Crear Usuario
          </a>
        </div>
      </div>
    </>
  );
}
