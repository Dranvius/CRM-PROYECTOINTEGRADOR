import React from "react";
//!Herramientas para hacer rutas en funciòn del componenet APP
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//! Estado global del cambio del usuario
import { useAuthStore } from "../storage/globalStorage";


//parte superior pagina//
export function NavbarLinks({ page, typeUser }) {

  //!Uso de zustand
  const logout = useAuthStore((state) => state.logout);
  //!Navigate
    //*Navegaciòn component
      //!Tener presente APP  
  const navigate = useNavigate();

  //*Manejo de condiciones props para devolver el componente
    //*En funciòn del ususario y de la pagina accedida
  if (typeUser == false) {

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="#">
              <img
                src="../src/img/logoB.png"
                width="60"
                height="60"
                alt="LogoPic"
              />
              Linares Modulares
            </a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="navbar-nav">
                <Link
                  to="/profile"
                  className={
                    page === "profile"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Perfil
                </Link>
                <Link
                  to="/dashboard"
                  className={
                    page === "dashboard"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link "
                  }
                >
                  Estadísticas
                </Link>
                <Link
                  to="/usuarios"
                  className={
                    page === "usuarios"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Usuarios
                </Link>
                <Link
                  to="/clientes"
                  className={
                    page === "clientes"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Clientes
                </Link>
                <Link
                  to="/productos"
                  className={
                    page === "productos"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Productos
                </Link>
                <Link
                  to="/cotizaciones"
                  className={
                    page === "cotizacion"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Cotizaciones
                </Link>
              </div>
            </div>

            <button
              className="navbar-text borderColor:black"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Salir
            </button>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="#">
              <img
                src="../src/img/logoB.png"
                width="60"
                height="60"
                alt="LogoPic"
              />
              Linares Modulares
            </a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="navbar-nav">
                <Link
                  to="/profile"
                  className={
                    page === "profile"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Perfil
                </Link>
                <Link
                  to="/dashboard"
                  className={
                    page === "dashboard"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link "
                  }
                >
                  Estadísticas
                </Link>
                <Link
                  to="/clientes"
                  className={
                    page === "clientes"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Clientes
                </Link>
                <Link
                  to="/productos"
                  className={
                    page === "productos"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Productos
                </Link>
                <Link
                  to="/cotizaciones"
                  className={
                    page === "cotizacion"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                >
                  Cotizaciones
                </Link>
              </div>
            </div>

            <button
              className="navbar-text"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Salir
            </button>
          </div>
        </nav>
      </>
    );
  }
}
