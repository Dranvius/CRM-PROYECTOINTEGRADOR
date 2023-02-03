import axios from "../lib/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ListsContext } from "../context/ListsContext";
import { useState } from "react";
import { useAuthStore } from "../storage/globalStorage.js"; 
import { useNavigate } from "react-router-dom";
import "../style/estilos.css";

const element = <FontAwesomeIcon icon={faShare} />;
const element2 = <FontAwesomeIcon icon={faThumbsUp} />;

export function Boton() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [icon, setIcon] = useState(element2);
  const ContextoObjetos = useContext(ListsContext);

  const trigger = async (e) => {
    e.preventDefault();

    

    const user = e.target[0].value;
    const password = e.target[1].value;
    const check = e.target[2].value;

    const peticion = await axios.post("/login", {
      user,
      password,
      check,
    });

    setToken(peticion.data.token);

    const peticion2 = await axios.get("/login", {
      user,
      password,
      check,
    });

    setUser(peticion2.data);

    navigate("/profile");
  };

  return (
    <>
      <div id="pic">
        <img src="../src/img/logoB.png" alt="mal" id="logo" />
      </div>

      <div className="row" id="formulario">
        <div className="col-6 ">

          <form onSubmit={trigger}>
            <div className="mb-3 text-center text-light">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Usuario/Correo Electronico
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-center text-light">
                Nosotros no vamos a compartir tu correo con nadie.
              </div>
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
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input "
                id="exampleCheck1"
              />
              <label
                className="form-check-label text-light"
                htmlFor="exampleCheck1"
              >
                ¡Recuerdame!
              </label>
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
    </>
  );
}
