import { useEffect, useState } from "react";
import { NavbarLinks } from "../components/NavbarLinks";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import { BsFillChatSquareFill, BsBookFill } from "react-icons/bs";
import { useAuthStore } from "../storage/globalStorage.js"; 
import { TableList } from "../components/TableList.jsx";

export function ListClient(props) {
  const profile = useAuthStore((state) => state.user);
  const profileStatus = profile.status;

  const [clientes, setClientes] = useState([]); // Estado para la lista de clientes

  // Función para cargar la lista de clientes
  const cargarClientes = async () => {
    try {
      const { data } = await axios.get("/clientdats"); // Ruta para obtener clientes
      setClientes(data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
    }
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    cargarClientes();
  }, []);

  // Función para crear un nuevo cliente
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
      html: `
        <label for="swal-input1" style="font-weight: bold;">Información Del Cliente</label>
        <input id="swal-input1" class="swal2-input" placeholder="Nuevo Nombre">
        <input id="swal-input2" class="swal2-input" placeholder="Nuevo Apellido">
        <input id="swal-input3" class="swal2-input" placeholder="Nueva Cedula">
        <label for="swal-input1" style="font-weight: bold;">Datos De Contacto</label>
        <input id="swal-input5" class="swal2-input" placeholder="Nuevo Correo Electronico">
        <input id="swal-input4" class="swal2-input" placeholder="Nuevo Celular">`,
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
      try {
        await axios.post("/newClient", {
          datos: formValues,
          creador: profile.id,
        });
        Swal.fire({
          icon: "success",
          title: "Cliente creado con éxito",
          text: "El cliente ha sido registrado correctamente.",
          confirmButtonText: "OK",
          allowOutsideClick: false, 
          allowEscapeKey: false, 
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire("Error al crear el cliente", "Inténtalo de nuevo", "error");
        console.error("Error al crear cliente:", error);
      }
    }
  };

  return (
    <>
      <NavbarLinks page="clientes" typeUser={profileStatus} />
      <div id="container-users">
        <div id="list-users">
          {/* Asegúrate de que TableList esté recibiendo clientes como prop */}
          <TableList ente="cliente" data={clientes} /> {/* Pasar datos actualizados */}
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
            Crear Cliente
          </a>
        </div>
      </div>
    </>
  );
}
