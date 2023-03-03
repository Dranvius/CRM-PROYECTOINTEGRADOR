import { text } from "@fortawesome/fontawesome-svg-core";
import Swal from "sweetalert2";

import  axios  from "../lib/axios";

export const ListFunction = ({prop,datos}) => {

  console.log(prop);
  console.log(datos);

//listado de funciones para crear y eliminar//


  //Botones de Usuario //


    //EDITAR USUARIO//

  const editUser = async (indice) => {
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

      console.log(resultado);
    }
  };


  //ELIMINAR USUARIO//

  const deleteUser = async (indice) => {
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

      console.log(respuesta);
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


  
  //! botones Cliente

  const editClient = async (indice) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar Cliente",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre ">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Cedula ">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Telefono">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Correo">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Estado">',
      
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
          document.getElementById("swal-input6").value,

        ];
      },
    });

    if (formValues) {
      const resultado = await axios.post("/editClient", {
        datos: formValues,
        index: indice,
      });

      console.log(resultado);
    }
  };

 



  //Eliminar cliente//

  const deleteClient = async (indice) => {
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
      Swal.fire({ html: `La seleción es: ${opcion}` });

      const respuesta = await axios.post("/deletClient", {
        datos: indice,
      });

      console.log(respuesta);
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

     //! BOTONES PRODUCTOS//
     //editar producto//
     const editProduct = async (indice) => {
      const { value: formValues } = await Swal.fire({
        title: "Editar Cliente",
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Producto ">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Precio">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Descripcion">' +
          '<input id="swal-input4" class="swal2-input" placeholder="Descuento">' +
          '<input id="swal-input5" class="swal2-input" placeholder="Status">',
          
        
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
            document.getElementById("swal-input4").value,
            document.getElementById("swal-input5").value,
            
  
          ];
        },
      });
  
      if (formValues) {
        const resultado = await axios.post("/editProduct", {
          datos: formValues,
          index: indice,
        });
  
        console.log(resultado);
      }
    };
  
    

    //eliminar producto//
    const deleteProduct = async (indice) => {
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
        Swal.fire({ html: `La seleción es: ${opcion}` });
  
        const respuesta = await axios.post("/deleteProduct", {
          datos: indice,
        });
  
        console.log(respuesta);
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


    if(prop === 'usuario'){

        return(<table className="table table-dark  table-hover">
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
              <th scope="row">{i+1}</th>
              <td>{objeto.firstname}</td>
              <td>{objeto.lastname}</td>
              <td>{objeto.cc}</td>
              <td>{objeto.email}</td>
              <td>{objeto.numbercelphone}</td>
              
              <td>{objeto.tipo == true ? "Activo" : "Desactivo"}</td>
              <td>{objeto.statusu == true ? "Activo" : "Desactivo"}</td>
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
      </table>)
        

    }else if(prop === 'cliente'){

        return(<table className="table table-dark  table-hover">
        <thead>
          
          <tr>
            <td scope="col">#</td>
            <td scope="col">Nombre</td>
            <td scope="col">Apellido</td>
            <td scope="col">Cédula</td>
            <td scope="col">Correo</td>
            <td scope="col">Telefono</td>
            <td scope="col">status</td>
            <td scope="col">Usuario creador</td>
            <td scope="col">Botones de acción</td>
          </tr>
        </thead>
        <tbody>
          {datos.map((objeto, i) => (
            <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>{objeto.firstname}</td>
              <td>{objeto.lastname}</td>
              <td>{objeto.cc}</td>
              <td>{objeto.mail}</td>
              <td>{objeto.numbercelphone}</td>
              <td>{objeto.status == true ? "Activo" : "Desactivo"}</td>
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
      </table>)
        

    }else if(prop === 'producto'){
      
      return(<table className="table table-dark  table-hover">
        
        <thead>
          
          <tr>
            <td scope="col">#</td>
            <td scope="col">Producto</td>
            <td scope="col">Precio</td>
            <td scope="col">Descripcion</td>
            <td scope="col">Descuento</td>
            <td scope="col">Status</td>
            <td scope="col">Botones</td>
            
         </tr>
        </thead>
        <tbody>
          {datos.map((objeto, i) => (
            
            <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>{objeto.nameproduct}</td>
              <td>{objeto.price}</td>
              <td>{objeto.description}</td>
              <td>{objeto.discount}</td>
              <td>{(objeto.status===true)? "Activo":"Desactivado"}</td>
            
              
              
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
      </table>)
    }else if(prop === 'cotizacion'){

      return(<table className="table table-dark  table-hover">
        
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
              <th scope="row">{i+1}</th>
              <td>{objeto.valor}</td>
              <td>{objeto.cliente_coti}</td>
            </tr>
          ))}
        </tbody>
      </table>)
    }

}