import axios from "../lib/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuthStore } from "../storage/globalStorage.js"; 
import { useNavigate } from "react-router-dom";
import "../style/estilos.css";
import Swal from 'sweetalert2'

const element = <FontAwesomeIcon icon={faShare} />;
const element2 = <FontAwesomeIcon icon={faThumbsUp} />;

export function Boton() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  
  const navigate = useNavigate();
  const [icon, setIcon] = useState(element2);

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const trigger = async (e) => {
    e.preventDefault();

    const user = e.target[0].value;
    const password = e.target[1].value;
    

    try {

    const peticion = await axios.post("/login", {
      user,
      password,
    });

    setToken(peticion.data.token); //!Respuesta peticiòn 30

    const peticion2 = await axios.get("/login", {
      user,
      password,
    });

    setUser(peticion2.data); //!Datos del usuario de manera local

    navigate("/profile");

    } catch (error) {
     
      Toast.fire({
        icon: 'error',
        title: 'Contraseña o correo incorrecto'
      })
      console.log("error de autentificación")
    }


    
  };

  return (
    <>
      <div id="formContainer">

        <div id="pic">
          <img src="../src/img/logoB.png" alt="mal" id="logo"/>
        </div>

        <div id="formulario">

          <div>

            <form onSubmit={trigger}>
              <div className="mb-3 text-center text-light">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Usuario
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 text-center text-light">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                />
              </div>

              <div id="boton">
                <button id="start" className="btn-neon">
                  <span id="span1"></span>
                  <span id="span2"></span>
                  <span id="span3"></span>
                  <span id="span4"></span>

                  <div
                      id="icono"
                      onMouseOver={() => {
                        setIcon(element);
                      }}
                      onMouseOut={() => {
                        setIcon(element2);
                      }}
                  >
                    {icon}
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

    </>
  );
}
