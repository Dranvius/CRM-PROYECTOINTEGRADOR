import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../storage/globalStorage";
import { NavbarLinks } from "../components/NavbarLinks";
import { useEffect,useState } from "react";
import axios from "../lib/axios";

import Swal from "sweetalert2";

export function ProfilePage() {
  
  const profile = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  
  //?Funciones

  const cambioName = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Cambio Nombre",
      titleText:
        "Nombre Actual :\n" +
        profile.name.toUpperCase() +
        "\n" +
        profile.lastName.toUpperCase(),
      icon: "question",
      iconColor: "#447AD3",
      color: "#447AD3",
      width: "35%",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "Confirmar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      background: "white",
      footer:
        "<center><b>RECUERDA</b><br>No utilice nombres repetidos</center>",
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
        formValues.push(profile.cc);

        const peticion = await axios.post("/cambiarNombre", formValues);

        console.log(peticion)

        const newVlues = {
          id: profile.id,
          name: formValues[0],
          lastName: formValues[1],
          tel: profile.tel,
          email: profile.email,
          cc: profile.cc
        }

        setUser(newVlues)

        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });
        


      } catch (error) {
        Swal.fire({
          title: "Algo salio mal",
          confirmButtonColor: "red",
          footer: "<center>INFORMAR AL AREA DE SISTEMAS</center>",
          width: "20%",
          icon: "error",
        });
      }
    }
  };

  const cambioContraseña = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Cambio Contraseña",
      icon: "question",
      iconColor: "#447AD3",
      color: "#447AD3",
      width: "35%",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "Confirmar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      background: "white",
      footer:
        "<center><b>RECUERDA</b><br>No debe olvide su contraseña</center>",
      html: '<input id="swal-input1" class="swal2-input" placeholder="Nueva Contarseña">',
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

        const newVlues = {
          id: profile.id,
          name: profile.name,
          lastName: profile.lastName,
          tel: profile.tel,
          email: profile.email,
          cc: profile.cc
        }

        setUser(newVlues)
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

  const cambioCorreo = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Cambio correo electrónico",
      icon: "question",
      iconColor: "#447AD3",
      color: "#447AD3",
      width: "35%",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "Confirmar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      background: "white",
      footer:
        "<center><b>RECUERDA</b><br>Recuerde que este correo es su usuario de autentificación</center>",
      html: '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Correo">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    });

    if (formValues) {
      try {
        formValues.push(profile.cc);

        const peticion = await axios.post("/cambiarCorreo", formValues);

        console.log(peticion)

        const newVlues = {
          id: profile.id,
          name: profile.name,
          lastName: profile.lastName,
          tel: profile.tel,
          email: formValues[0],
          cc: profile.cc
        }
        
        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });

        // setTimeout(() =>{
        //   window.location.href = window.location.href;
        // },1000) 
        
        setUser(newVlues)
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "ALGO SALIO MAL",
          confirmButtonColor: "red",
          footer: "<center>INFORMAR AL AREA DE SISTEMAS</center>",
          width: "20%",
          icon: "error",
        });
      }
    }
  };

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
            <a
              className="btn btn-outline-light"
              onClick={() => {
                cambioCorreo();
              }}
              role="button"
            >
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
