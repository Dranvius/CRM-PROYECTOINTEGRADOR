import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../storage/globalStorage";
import { Link } from "react-router-dom";

export function NavbarLinks() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

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
              <Link to="/profile" className="nav-item nav-link active">
                Perfil
              </Link>
              <Link to="/dashboard" className="nav-item nav-link">
                Estadísticas
              </Link>
              <Link to="/usuarios" className="nav-item nav-link">
                Usuarios
              </Link>
              <Link to="/clientes" className="nav-item nav-link">
                Clientes
              </Link>
              <Link to="/cotizaciones" className="nav-item nav-link">
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
