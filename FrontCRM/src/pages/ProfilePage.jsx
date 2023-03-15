import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../storage/globalStorage";
import { NavbarLinks } from "../components/NavbarLinks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
import axios from "../lib/axios";

import Swal from "sweetalert2";

export function ProfilePage() {
  const profile = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  // const [img, setImg] = useState("");
  // const [valores, setValores] = useState("");

  const cambioName = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Cambio Nombre",
      titleText:
        "Nombre Actual :\n" +
        profile.name.toUpperCase() +
        "\n" +
        profile.lastName.toUpperCase(),
      iconColor: "blue",
      icon: "question",
      color: "black",
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
        '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Nuevo Apellido">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      try {
        formValues.push(profile.email);
        
        const peticion = await axios.post("/cambiarNombre", formValues);

        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });
        navigate("/profile");
      } catch (error) {
        Swal.fire({
          title: "ALGO SALIO MAL",
          confirmButtonColor: "red",
          footer: "<center>INFORMAR AL AREA DE SISTEMAS</center>",
          color: "black",
          width: "20%",
          icon: "error",
        });
      }
    }
  };

  const cambioContraseña = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Cambio Contraseña",
      iconColor: "blue",
      icon: "question",
      color: "black",
      width: "35%",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "Confirmar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      background: "white",
      footer: "<center><b>RECUERDA</b><br>Recordar la contraseña</center>",
      html: '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Contarseña">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    });

    if (formValues) {
      try {
        formValues.push(profile.email);
       
        const peticion = await axios.post("/cambiarContrasena", formValues);

        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });

        navigate("/profile");
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "ALGO SALIO MAL",
          confirmButtonColor: "red",
          footer: "<center>INFORMAR AL AREA DE SISTEMAS</center>",
          color: "black",
          width: "20%",
          icon: "error",
        });
      }
    }
  };

  const Name = profile.name;
  const Pic = "https://robohash.org/" + Name;

 

  const profileStatus = profile.status;

  return (
    <div>
      <NavbarLinks page="profile" typeUser={profileStatus} />

      <div id="container-General">
        <div id="left-area">
          <div id="saludo">BUEN DÍA</div>

          <div id="photo">
            <img
              src="../src/img/logoB.png"
              width="150px"
              height="150px"
              alt="ProfilePhoto"
              id="foto-profile"
            />
          </div>

          <div id="nombre">
            {profile.name.toUpperCase()} {profile.lastName.toUpperCase()}
          </div>

          <div id="list-action">
            <a
              className="btn btn-outline-light"
              onClick={() => {
                cambioName();
                navigate("/profile");
              }}
              role="button"
            >
              Cambiar Nombre
            </a>

            <a
              className="btn btn-outline-light"
              onClick={() => {
                cambioContraseña();
                navigate("/profile");
              }}
              role="button"
            >
              Cambiar Contraseña
            </a>
            <a className="btn btn-outline-light" href="#" role="button">
              Cambiar Correo
            </a>
          </div>

          <div id="Company-list">
            <img
              src="../src/img/logoB.png"
              width="100px"
              height="100px"
              alt="LogoPic"
            />
          </div>
        </div>

        <div id="rigth-area">
          <table className="table table-striped table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Descripción</th>
                <th scope="col">Encabezado</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
              <tr
                onMouseOver={() => {
                  console.log("Hola");
                }}
                onMouseOut={() => {
                  console.log("Adios");
                }}
              >
                <td>21/02/2023</td>
                <td>Bienvenido al software</td>
                <td>Saludos</td>
                <th scope="row">1</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
