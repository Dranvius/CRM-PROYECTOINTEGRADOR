import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../storage/globalStorage";

export function NavbarLinks({ page, typeUser }) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* Botón Toggler para pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo y Nombre */}
        <a className="navbar-brand" href="#">
          <img
            src="../src/img/logoB.png"
            width="50"
            height="50"
            alt="LogoPic"
          />
          Linares Modulares
        </a>

        {/* Contenido del navbar */}

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Enlaces comunes */}
            <li className="nav-item">
              <Link
                to="/profile"
                className={`nav-link ${page === "profile" ? "active" : ""}`}
              >
                Perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${page === "dashboard" ? "active" : ""}`}
              >
                Estadísticas
              </Link>
            </li>
            {typeUser && (
              <li className="nav-item">
                <Link
                  to="/usuarios"
                  className={`nav-link ${page === "usuarios" ? "active" : ""}`}
                >
                  Usuarios
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                to="/clientes"
                className={`nav-link ${page === "clientes" ? "active" : ""}`}
              >
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/productos"
                className={`nav-link ${page === "productos" ? "active" : ""}`}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cotizaciones"
                className={`nav-link ${page === "cotizacion" ? "active" : ""}`}
              >
                Cotizaciones
              </Link>
            </li>
          </ul>

          {/* Botón de salir */}
          
          <button
            className="btn btn-outline-light"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
