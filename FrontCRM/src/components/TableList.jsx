import { useContext, useState, useEffect } from "react";
import { ListsContext } from "../context/ListsContext";
import { Link } from "react-router-dom";
import {
  editUser,
  deleteUser,
  editClient,
  deleteClient,
  editProduct,
  deleteProduct,
  deleteCoutation,
} from "../functions/FuncionesTablas";

export function TableList({ ente }) {
  const [datos, setDatos] = useState([]);
  const [datosCliente, setDatosCliente] = useState([]);
  const [datosPorProceso, setDatosPorProceso] = useState(0);
  const [search, setSearch] = useState("");
  
  const context = useContext(ListsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        let data;
        switch (ente) {
          case "usuario":
            data = await context.datosListUsuario();
            break;
          case "cliente":
            data = await context.datosListCliente();
            break;
          case "producto":
            data = await context.datosListProducto();
            break;
          case "cotizacion":
            data = await context.datosListCotizacion();
            setDatosCliente(await context.datosClienteOrden());
            break;
          default:
            data = [];
        }
        setDatos(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [ente, context]);

  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target[0].value.toLowerCase();
    const filteredData = datos.filter((dato) => {
      if (ente === "usuario") return dato.firstname.toLowerCase().includes(value);
      if (ente === "cliente") return dato.cc.includes(value);
      if (ente === "producto") return dato.nameproduct.toLowerCase().includes(value);
      if (ente === "cotizacion") return dato.cc.includes(value);
      return true;
    });
    setDatos(filteredData);
  };

  const nextPage = () => {
    if (datosPorProceso < datos.length - 5) {
      setDatosPorProceso(datosPorProceso + 5);
    }
  };

  const backPage = () => {
    if (datosPorProceso > 0) {
      setDatosPorProceso(datosPorProceso - 5);
    }
  };

  const renderTableRows = () => {
    const currentData = datos.slice(datosPorProceso, datosPorProceso + 5);
    return currentData.map((item, i) => {
      if (ente === "usuario") {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.cc}</td>
            <td>{item.email}</td>
            <td>{item.numbercelphone}</td>
            <td>{item.tipo ? "Activo" : "Desactivado"}</td>
            <td>
              <div
                id={item.statusu ? "circleStatusGreen" : "circleStatusRed"}
              ></div>
            </td>
            <td>
              <button onClick={() => editUser(item.id_users)} className="btn btn-primary">Editar</button>
              <button onClick={() => deleteUser(item.id_users)} className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        );
      } else if (ente === "cliente") {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.cc}</td>
            <td>{item.mail}</td>
            <td>{item.numbercelphone}</td>
            <td>
              <div
                id={item.statusc ? "circleStatusGreen" : "circleStatusRed"}
              ></div>
            </td>
            <td>{item.email}</td>
            <td>
              <button onClick={() => editClient(item.id_client)} className="btn btn-primary">Editar</button>
              <button onClick={() => deleteClient(item.id_client)} className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        );
      } else if (ente === "producto") {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.nameproduct}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.discount}</td>
            <td>
              <div
                id={item.statusp ? "circleStatusGreen" : "circleStatusRed"}
              ></div>
            </td>
            <td>
              <button onClick={() => editProduct(item.id_product)} className="btn btn-primary">Editar</button>
              <button onClick={() => deleteProduct(item.id_product)} className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        );
      } else if (ente === "cotizacion") {
        const cliente = datosCliente.find(c => c.id_client === item.cliente_coti) || {};
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{cliente.firstname}</td>
            <td>{cliente.lastname}</td>
            <td>{cliente.cc}</td>
            <td>{item.valor_total}</td>
            <td>
              <button onClick={() => deleteCoutation(item.id_quotation)} className="btn btn-danger">Eliminar</button>
              <Link to={`/vistaPdf/${item.id_quotation}`} className="btn btn-info" style={{ color: 'white' }}>Ver cotización</Link>
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  const renderTableHeaders = () => {
    if (ente === "usuario") {
      return (
        <>
          <th>#</th><th>Nombre</th><th>Apellido</th><th>Cédula</th><th>Correo</th><th>Teléfono</th><th>Tipo</th><th>Estado</th><th>Acciones</th>
        </>
      );
    }
    if (ente === "cliente") {
      return (
        <>
          <th>#</th><th>Nombre</th><th>Apellido</th><th>Cédula</th><th>Correo</th><th>Teléfono</th><th>Estado</th><th>Usuario Creador</th><th>Acciones</th>
        </>
      );
    }
    if (ente === "producto") {
      return (
        <>
          <th>#</th><th>Producto</th><th>Precio</th><th>Descripción</th><th>Descuento</th><th>Estado</th><th>Acciones</th>
        </>
      );
    }
    if (ente === "cotizacion") {
      return (
        <>
          <th>#</th><th>Nombre Cliente</th><th>Apellido Cliente</th><th>Cédula</th><th>Valor</th><th>Acciones</th>
        </>
      );
    }
  };

  return (
    <div>
      <div id="search" className="pt-2">
        <nav className="navbar bg-body-tertiary" id="containerTop">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={backPage}>Anterior</button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={nextPage}>Siguiente</button>
            </li>
          </ul>
          <div className="container-fluid">
            <form className="d-flex" role="search" onSubmit={handleFilter}>
              <input className="form-control me-2" type="search" placeholder={`Buscar ${ente}`} aria-label="Buscar" />
              <button className="btn btn-success" type="submit">Filtrar</button>
            </form>
          </div>
        </nav>
      </div>
      <table className="table table-dark table-hover">
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}
