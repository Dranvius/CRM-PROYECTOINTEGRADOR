import Swal from "sweetalert2";
//!Axios modificado para tener una cabecera o HEADER automatico
import  axios  from "../lib/axios";
//!Rutas react
import { useNavigate } from "react-router-dom";
//!PDF Visualizador
import {ViewPdf} from "../pages/ViewPdf"

//!Funciones utilizadas de los Botones
//TODO: listado de funciones para crear y eliminar



//!BOTONES USUARIO

//?Editar usuario
export const editUser = async (indice) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar usuario",
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nombre ">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Cedula ">' +
      '<input id="swal-input4" class="swal2-input" placeholder="Correo">' +
      '<input id="swal-input5" class="swal2-input" placeholder="Telefono">' +
      '<input id="swal-input6" class="swal2-input" placeholder="Contraseña">' +
      '<input id="swal-input7" class="swal2-input" placeholder="Tipo">' +
      '<input id="swal-input8" class="swal2-input" placeholder="Estado">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value,
        document.getElementById("swal-input5").value,
        document.getElementById("swal-input6").value,
        document.getElementById("swal-input7").value,
        document.getElementById("swal-input8").value,
      ];
    },
  });

  if (formValues) {
    const resultado = await axios.post("/editUsers", {
      datos: formValues,
      index: indice,
    });
  }
};

//?Eliminar usuario
export const deleteUser = async (indice) => {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        true: "Si",
        false: "No",
      });
    }, 1000);
  });

  const { value: opcion } = await Swal.fire({
    icon: "warning",
    title: "¿Desea Elminar este usuario?",
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Debes escoger un valor !";
      }
    },
  });

  if (opcion === "true") {
    Swal.fire({ html: `La seleción es: ${opcion}` });

    const respuesta = await axios.post("/eliminarusuario", {
      datos: indice,
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "No desea eliminar nada",

      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Debes escoger un valor !";
        }
      },
    });
  }
};

//!BOTONES CLIENTE

//?Editar cliente
export const editClient = async (indice) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar Cliente",
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nombre ">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Cedula ">' +
      '<input id="swal-input4" class="swal2-input" placeholder="Correo">' +
      '<input id="swal-input5" class="swal2-input" placeholder="Telefono">' +
      `
        <div style="text-align: left; margin-top: 10px;">
          <label><strong>Estado:</strong></label><br>
          <input type="radio" id="estado-activo" name="estado" value="true" checked>
          <label for="estado-activo">Activo</label><br>
          <input type="radio" id="estado-desactivo" name="estado" value="false">
          <label for="estado-desactivo">Desactivo</label>
        </div>
      `,
    focusConfirm: false,
    preConfirm: () => {
      const estadoValue = document.querySelector('input[name="estado"]:checked').value;
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value,
        document.getElementById("swal-input5").value,
        estadoValue === "true", // convierte string a boolean
      ];
    },
  });

  if (formValues) {
    const resultado = await axios.post("/editClient", {
      datos: formValues,
      index: indice,
    });

    location.reload();

  }
};

//?Eliminar cliente
export const deleteClient = async (indice) => {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        true: "Si",
        false: "No",
      });
    }, 1000);
  });

  const { value: opcion } = await Swal.fire({
    icon: "warning",
    title: "¿Desea Elminar este Cliente?",
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Debes escoger un valor !";
      }
    },
  });

  if (opcion === "true") {
    
    await axios.post("/deletClient", {
      datos: indice,
    });
    location.reload();

  } else {
    Swal.fire({
      icon: "warning",
      title: "No desea eliminar nada",

      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Debes escoger un valor !";
        }
      },
    });
  }
};

//!BOTONES PRODUCTOS

export const editProduct = async (indice, item) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar Producto",
    html:
    `<input id="swal-input1" class="swal2-input" placeholder="Producto" value="${item.nameproduct}">` +
    `<input id="swal-input2" class="swal2-input" placeholder="Precio" value="${item.price}">` +
    `<input id="swal-input3" class="swal2-input" placeholder="Descripción" value="${item.description}">` +
    `<div style="text-align: left; margin-top: 10px;">
      <label><strong>Descuento : </strong></label><br>
      <input type="radio" id="descuento-5" name="descuento" value="5" ${item.discount == 5 ? 'checked' : ''}>
      <label for="descuento-5">5 %</label><br>
      <input type="radio" id="descuento-25" name="descuento" value="25" ${item.discount == 25 ? 'checked' : ''}>
      <label for="descuento-25">25 %</label>
    </div>` +
    `<div style="text-align: left; margin-top: 10px;">
      <label><strong>Estado:</strong></label><br>
      <input type="radio" id="estado-activo" name="estado" value="true" ${item.status === true ? 'checked' : ''}>
      <label for="estado-activo">Activo</label><br>
      <input type="radio" id="estado-inactivo" name="estado" value="false" ${item.status === false ? 'checked' : ''}>
      <label for="estado-inactivo">Inactivo</label>
    </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = document.getElementById("swal-input1").value;
      const precio = document.getElementById("swal-input2").value;
      const descripcion = document.getElementById("swal-input3").value;
      const descuento = document.querySelector('input[name="descuento"]:checked').value;
      const estado = document.querySelector('input[name="estado"]:checked').value === "true";
      return [nombre, precio, descripcion, descuento,estado];
    },
  });

  if (formValues) {
    try {
      const resultado = await axios.post("/editProduct", {
        datos: {
          nameproduct: formValues[0],
          price: formValues[1],
          description: formValues[2],
          discount: formValues[3],
          status: formValues[4], // Asegúrate de que lo estés incluyendo
        },
        index: indice,
      });
  
      // ✅ Si todo va bien
      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "Los cambios han sido guardados correctamente.",
        confirmButtonText: "OK",
      });
  
      location.reload();

    } catch (error) {
      // ❌ Si hay error en la petición
      console.error("Error al actualizar producto:", error);
  
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text:
          error.response?.data?.message ||
          "Ocurrió un error inesperado al actualizar el producto.",
        confirmButtonText: "OK",
      });
    }
  }
  
};


//?Eliminar producto
export const deleteProduct = async (indice) => {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        true: "Si",
        false: "No",
      });
    }, 1000);
  });

  const { value: opcion } = await Swal.fire({
    icon: "warning",
    title: "¿Desea Elminar este Producto?",
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Debes escoger un valor !";
      }
    },
  });

  if (opcion === "true") {

    const respuesta = await axios.post("/deleteProduct", {
      datos: indice,
    });

    location.reload();
    
  } else {
    Swal.fire({
      icon: "warning",
      title: "No desea eliminar nada",

      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Debes escoger un valor !";
        }
      },
    });
  }
};


export const viewTableDats = (ente, datos) => {
  if (ente === "usuario") {
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

            <td scope="col">Tipo</td>
            <td scope="col">Estado</td>
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
    );
  } else if (ente === "cliente") {
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
  } else if (ente === "producto") {
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
                      editProduct(objeto.id_product,objeto);
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
  } else if (ente === "cotizacion") {
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
              <td>{objeto.cliente_coti}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

//!Botones de cotización
//?Eliminar cotización

export const deleteCoutation = async (indice) => {

  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        true: "Si",
        false: "No",
      });
    }, 1000);
  });

  const { value: opcion } = await Swal.fire({
    icon: "warning",
    title: "¿Desea Elminar esta cotización?",
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Debes escoger un valor !";
      }
    },
  });

  if (opcion === "true") {
    Swal.fire({ html: `La seleción es: ${opcion}` });

    const respuesta = await axios.post("/deleteCotizacion", {
      datos: indice,
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "No desea eliminar nada",

      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Debes escoger un valor !";
        }
      },
    });
  }


}
