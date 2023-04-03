//REACT HOOK CONTEXT
import { useContext, useState, useEffect } from "react";
//Constante de contexto de la lista
import { ListsContext } from "../context/ListsContext";
//Import Dinamict list
import { ListFunction } from "../functions/ListFunction";
//!Importar funciones de control de tablas.
import {
  editUser,
  deleteUser,
  editClient,
  deleteClient,
  editProduct,
  deleteProduct,
} from "../functions/FuncionesTablas";

export function TableList(props) {
  //!USE STATE
  //*Las variables de react
  let [datos, setDatos] = useState([]);
  let [datosCliente, setDatosCliente] = useState([]);
  //?Determinar los datos de cada pagina.
  let [datosPorProceso, datosPorProcesoSet] = useState(0);
  //?Filtro
  let [search, setSeacrh] = useState("");
  //!USE CONTEXT
  const ContextoObjetos = useContext(ListsContext);

  // const filtrarDatos = () =>{
  //   if(search.length === 0){
  //     return datos.slice(datosPorProceso,datosPorProceso+5)
  //   }

  //   const filtered = datos.filter (dato => dato.firstname.includes(search));
  //   return filtered.slice(datosPorProceso,datosPorProceso+5)

  // }

  //!Funciones de cotrol de paginación
  const nextPage = () => {
    if (datosPorProceso < 100) {
      datosPorProcesoSet(datosPorProceso + 5);
    }
  };

  const backPage = () => {
    if (datosPorProceso > 0) {
      datosPorProcesoSet(datosPorProceso - 5);
    }
  };

  //!Funciones de defición de filtración

  const filtrarResultado = (e, datos) => {
    console.log(e);
    const filtered = datos.filter((dato) =>
      dato.firstname.includes(e.target[0].value)
    );
    console.log(filtered);
    setDatos(filtered);
  };

  //!USE EFFECT DATOS DE TABLAS
  //?Datos que generan la tabla
  //*Posible simplificación
  if (props.ente === "usuario") {
    useEffect(() => {
      async function fetchData() {
        try {
          let dats = await ContextoObjetos.datosListUsuario();
          console.log(dats);
          dats = dats.slice(0, 5);
          setDatos(dats);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, []);
  } else if (props.ente === "cliente") {
    useEffect(() => {
      async function fetchData() {
        try {
          let dats = await ContextoObjetos.datosListCliente();
          dats = dats.slice(0, 5);
          setDatos(dats);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, []);
  } else if (props.ente === "producto") {
    useEffect(() => {
      async function fetchData() {
        try {
          let dats = await ContextoObjetos.datosListProducto();
          dats = dats.slice(0, 5);
          setDatos(dats);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, []);
  } else if (props.ente === "cotizacion") {
    useEffect(() => {
      async function fetchData() {
        try {
          let dats = await ContextoObjetos.datosListCotizacion();
          dats = dats.slice(0, 5);
          setDatosCliente(await ContextoObjetos.datosClienteOrden());
          setDatos(dats);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, []);
  }

  //!Cargar los datos de la tabla
  if (props.ente === "usuario") {
    return (
      <>
        <div id="search" className="pt-2">
          <nav className="navbar bg-body-tertiary" id="containerTop">
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link" onClick={backPage}>
                  Anterior
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={nextPage}>
                  Siguiente
                </button>
              </li>
            </ul>
            <div className="container-fluid">
              <form
                className="d-flex"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  filtrarResultado(e, datos);
                }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar Usuario"
                  aria-label="Buscar"
                />
                <button className=" btn btn-success" type="submit">
                  Filtrar
                </button>
              </form>
            </div>
          </nav>
        </div>
        {/* <nav aria-label="Page navigation align-self-center ">
      <ul className="pagination  ">
        <li className="page-item disabled">
          <a className="page-link" href="#" tabIndex="-1">
            Previous
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
      </nav> */}
        <table className="table table-dark  table-hover">
          <thead>
            <tr>
              <td scope="col">#</td>
              <td scope="col">Nombre</td>
              <td scope="col">Apellido</td>
              <td scope="col">Cédula</td>
              <td scope="col">Correo</td>
              <td scope="col">Telefono</td>

              <td scope="col">Tipo</td>
              <td scope="col">Estado</td>
              <td scope="col">Botones de acción</td>
            </tr>
          </thead>
          <tbody>
            {datos
              .slice(datosPorProceso, datosPorProceso + 5)
              .map((objeto, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{objeto.firstname}</td>
                  <td>{objeto.lastname}</td>
                  <td>{objeto.cc}</td>
                  <td>{objeto.email}</td>
                  <td>{objeto.numbercelphone}</td>
                  <td>{objeto.tipo == true ? "Activo" : "Desactivo"}</td>
                  <td>
                    {" "}
                    <div
                      id={
                        objeto.statusu === true
                          ? "circleStatusGreen"
                          : "circleStatusRed"
                      }
                    ></div>
                  </td>

                  <td>
                    <div className="btn-group">
                      <a
                        className="btn btn-primary"
                        onClick={() => {
                          editUser(objeto.id_users);
                        }}
                      >
                        Editar
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={() => {
                          deleteUser(objeto.id_users);
                        }}
                      >
                        Eliminar
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  } else if (props.ente === "cliente") {
    return (
      <table className="table table-dark  table-hover">
        <thead>
          <tr>
            <td scope="col">#</td>
            <td scope="col">Nombre</td>
            <td scope="col">Apellido</td>
            <td scope="col">Cédula</td>
            <td scope="col">Correo</td>
            <td scope="col">Telefono</td>
            <td scope="col">Estado</td>
            <td scope="col">Usuario creador</td>
            <td scope="col">Botones de acción</td>
          </tr>
        </thead>
        <tbody>
          {datos.map((objeto, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{objeto.firstname}</td>
              <td>{objeto.lastname}</td>
              <td>{objeto.cc}</td>
              <td>{objeto.mail}</td>
              <td>{objeto.numbercelphone}</td>
              <td>
                {" "}
                <div
                  id={
                    objeto.statusc === true
                      ? "circleStatusGreen"
                      : "circleStatusRed"
                  }
                ></div>
              </td>
              <td>{objeto.email}</td>
              <td>
                <div className="btn-group">
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      editClient(objeto.id_client);
                    }}
                  >
                    Editar
                  </a>
                  <a
                    className="btn btn-danger"
                    onClick={() => {
                      deleteClient(objeto.id_client);
                    }}
                  >
                    Eliminar
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (props.ente === "producto") {
    return (
      <table className="table table-dark  table-hover">
        <thead>
          <tr>
            <td scope="col">#</td>
            <td scope="col">Producto</td>
            <td scope="col">Precio</td>
            <td scope="col">Descripcion</td>
            <td scope="col">Descuento</td>
            <td scope="col">Estado</td>
            <td scope="col">Botones</td>
          </tr>
        </thead>
        <tbody>
          {datos.map((objeto, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{objeto.nameproduct}</td>
              <td>{objeto.price}</td>
              <td>{objeto.description}</td>
              <td>{objeto.discount}</td>
              <td>
                <div
                  id={
                    objeto.statusp === true
                      ? "circleStatusGreen"
                      : "circleStatusRed"
                  }
                ></div>
              </td>

              <td>
                <div className="btn-group">
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      editProduct(objeto.id_product);
                    }}
                  >
                    Editar
                  </a>
                  <a
                    className="btn btn-danger"
                    onClick={() => {
                      deleteProduct(objeto.id_product);
                    }}
                  >
                    Eliminar
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (props.ente === "cotizacion") {
    return (
      <table className="table table-dark  table-hover">
        <thead>
          <tr>
            <td scope="col">#</td>
            <td scope="col">Valor</td>
            <td scope="col">Relacion cliente</td>
          </tr>
        </thead>
        <tbody>
          {datos.map((objeto, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{objeto.valor_total}</td>
              <td>
                {
                  datosCliente.filter(
                    (valor) => valor.id_client === objeto.id_quotation
                  )[0].firstname
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
