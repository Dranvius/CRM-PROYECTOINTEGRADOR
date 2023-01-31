import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../storage/globalStorage";
import { NavbarLinks } from "../components/NavbarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../lib/axios";
import { useState } from "react";
import Swal from "sweetalert2";

export function ProfilePage() {
  const profile = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [valores, setValores] = useState("");

  // const traerElemento = async (){
  //   const valores = await Axios.get('',{})

  // }
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
        formValues.push(profile.email)
        console.log(formValues)
        const peticion = await axios.post("/cambiarNombre",formValues);

        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });

        navigate("/profile");

        console.log(peticion);
      } catch (error) {
        console.log(error);

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
      footer:
        "<center><b>RECUERDA</b><br>Recordar la contraseña</center>",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Contarseña">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
        ];
      },
    });

    if (formValues) {
      try {
        formValues.push(profile.email)
        console.log(formValues)
        const peticion = await axios.post("/cambiarContrasena",formValues);

        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });

        navigate("/profile");

        
      } catch (error) {
        console.log(error);

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

  return (
    <div>
      <NavbarLinks />

      <div id="container-General">
        <div id="left-area">
          <div id="saludo">BUEN DÍA</div>

          <div id="nombre">
            {profile.name.toUpperCase()} {profile.lastName.toUpperCase()}
          </div>

          <div id="descripcion">
            <h2 id="perfil-text">PERFIL</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat unde
            commodi soluta accusamus possimus quas harum eos ipsam, eum,
            pariatur cumque, aperiam odio id suscipit iusto minus consequuntur
            quia atque.
          </div>

          <div id="list-action">
            <a
              className="btn btn-outline-light"
              onClick={() => {
                cambioName();
                navigate("/profile");
              }
              }
              role="button"
            >
              Cambiar Nombre
            </a>
            <a className="btn btn-outline-light" onClick={ () =>{
              cambioContraseña();
              navigate("/profile");
            }} role="button">
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
          <img id="profile-pic" src={Pic} />
        </div>
      </div>

      {/* <div id="container-profile-page">
        <div id="menu-lateral">
          <div>
            <h6>Acciones de perfil</h6>
          </div>
          <div id="Botones-Menu-Usuario">
          <button id='primer'>Cambiar Nombre</button>
          <button id='segundo'>Cambiar Correo</button>
          <button id='segundo'>Cambiar Telefono</button>
          <button id='tercero'>Cambiar Contraseña</button>
          </div>
        </div>

        <div id="userinfo">
          <div id="top">
            <img id="profile-pic" src={Pic}/>
            <h2 id="saludo">BUEN DÍA : {profile.name.toUpperCase()} {profile.lastName.toUpperCase()} </h2>
          </div>
          <div id="listDats">
            <h1>INFORMACIÓN : </h1>
            <ol>
              <li>
                <p className="fw-bolder">Nombre : {profile.name}</p>
              </li>
              <li>
                <p className="fw-bolder">Apellido : {profile.lastName}</p>
              </li>
              <li>
                <p className="fw-bolder">Correo : {profile.email}</p>
              </li>
              <li>
                <p className="fw-bolder">Telefono : {profile.tel}</p>
              </li>
            </ol>

          </div>
        </div>
      </div>*/}
    </div>
  );
}
