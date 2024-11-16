//REACT HOOK CONTEXT
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Constante de contexto de la lista
import { ListsContext } from "../context/ListsContext";
//Axios
import axios from "../lib/axios";
//Sweet Alert
import Swal from "sweetalert2";
//Importar al usuario que use el login
import { useAuthStore } from "../storage/globalStorage";

export function CrearPDF(props) {
  const profile = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  // crea un nuevo objeto `Date`

  var today = new Date();

  // obtener la fecha de hoy en formato `MM/DD/YYYY`

  var now = today.toLocaleDateString("en-US");
  

  //USE STATE

  const [cliente, setCliente] = useState([]);
  const [producto, setProducto] = useState([]);
  const [usuario, setUsuarios] = useState(1);

  //USE CONTEXT

  const ContextoObjetos = useContext(ListsContext);

  //USE EFFECT

  useEffect(() => {
    async function fetchData() {
      try {
        const dats = await ContextoObjetos.datosClienteOrden();
        const datsProduct = await ContextoObjetos.datosProductos();

        setCliente(dats);
        setProducto(datsProduct);

        
      } catch (err) {

      }
    }
    fetchData();
  }, []);

  const ToastValidate = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });



  const listComplete = (producto) =>{
    let tr = ``

    producto.map((objeto, key) => (

      tr = tr + `<tr>

      <th scope="row">`+(key+1)+`</th>
        <td>`+objeto.nameproduct+`</td>
        <td>`+objeto.description+`</td>
        <td> 
          <div class="number" id="aumentador">
            <button type="button" class="btn btn-outline-primary" id="up" onclick="function myFunction(){ document.getElementById('valor`+key+`').value = Number(document.getElementById('valor`+key+`').value) +1} myFunction()">▲</button>
            <input type="text" class="inputCount" value=1 id="valor`+key+`"/>
            <button type="button" class="btn btn-outline-primary" id="down" onclick="function myFunction(){ document.getElementById('valor`+key+`').value = document.getElementById('valor`+key+`').value -1} myFunction()">▼</button>
          </div>
        </td>
        <td>
          <div class="form-check" id="check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate`+key+`"/>
          </div>
        </td> 
      </tr>`

    ))

    return tr

  }



  const ToastNegative = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const cotizacionBTN = async () => {
    /* inputOptions can be an object or Promise */
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          true: "Si",
          false: "No",
        });
      }, 1000);
    });

    const { value: opcion } = await Swal.fire({
      icon: "question",
      iconColor: "0d6efd",
      title: "Desea Crear una cotización",
      input: "radio",
      color: "#0d6efd",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas escoger un valor!";
        }
      },
    });

    if (opcion === "true") {
      

      const clientes = [];

      for (let i = 0; i < cliente.length; i++) {
        clientes.push(cliente[i].firstname + " " + cliente[i].lastname);
      }
      const { value: indice } = await Swal.fire({
        title: "Seleccione Un Cliente",
        color:"blue",
        input: "select",
        inputOptions: {
          clientes,
        },
        inputPlaceholder: "Seleccione cliente a realizar cotización",
        showCancelButton: true,
        inputValidator: async (value) => {
          return new Promise(async (resolve) => {
            if (value) {
              const peticion = clientes[value];
              const peticionCliente = await axios.post("/cotizacionStart", {
                informacion: peticion,
              });

              const datosUsarioSeleccionado = peticionCliente.data;

              if (datosUsarioSeleccionado) {
                const { value: informacionCliente } = await Swal.fire({
                  title: "Datos del cliente para la cotización son :",
                  html:
                  '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value=' +
                  datosUsarioSeleccionado[0].firstname +
                  " disabled>" +
                  '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value=' +
                  datosUsarioSeleccionado[0].lastname +
                  " disabled>" +
                  '<input id="swal-input3" class="swal2-input" placeholder="Apellido" value=' +
                  datosUsarioSeleccionado[0].cc +
                  " disabled>" +
                  '<input id="swal-input4" class="swal2-input" placeholder="Apellido" value=' +
                  datosUsarioSeleccionado[0].mail +
                  " disabled>" +
                  '<input id="swal-input5" class="swal2-input" placeholder="Apellido" value=' +
                  datosUsarioSeleccionado[0].numbercelphone +
                  " disabled>",
                  focusConfirm: false,
                  preConfirm: async () => {
                    return [
                      document.getElementById("swal-input1").value,
                      document.getElementById("swal-input2").value,
                      document.getElementById("swal-input3").value,
                      document.getElementById("swal-input4").value,
                      document.getElementById("swal-input5").value,
                      datosUsarioSeleccionado[0].id_client
                    ];
                  },
                });

                if (informacionCliente) {
                  let htmla =`<table class="table table-striped table-dark">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Contador</th>
                        <th scope="col">Selec</th>
                      </tr>
                      </thead>
                      <tbody>`
                        +listComplete(producto)+
                      `</tbody>
                      </table>`

                      

                  const { value: productosEscogidos } = await Swal.fire({
                    title: "Seleccione los productos : ",
                    html: htmla,
                    width: "100%",
                    color: "black",
                    focusConfirm: false,
                    inputValidator: (value) => {
                      
                      if (!value) {
                        return "Necesitas escoger un valor!";
                      }
                    },
                    preConfirm: () => {
                      let check = [];
                      let nulos = [];

                      producto.map((valor, key) => {
                        check.push(
                          document.getElementById(
                            "flexCheckIndeterminate" + key
                          ).checked
                        );

                        nulos.push(
                          document.getElementById("valor" + key).value
                        );
                        
                        console.table(check);
                        console.table(nulos);
                      });

                     
                      //!Pimera condición de la lista de productos
                      
                      if (!check.some((valor) => valor === true)) {
                        Swal.close();
                        ToastNegative.fire({
                          icon: "warning",
                          title:
                            "Error en el proceso\nDebes checkear por lo menos un producto",
                        });
                        
                      //!Pimera condición de la lista de productos

                      } else if (!nulos.some((valor) => valor > 0)) {
                        Swal.close();
                        ToastNegative.fire({
                          icon: "warning",
                          title:
                            "Error en el proceso\nNo pueden existir cantidades negativos o 0!",
                        });

                      } else {
                        let ProductosSeleccionados = [];

                        producto.map((value, key) => {
                          if (
                            document.getElementById(
                              "flexCheckIndeterminate" + key
                            ).checked === true &&
                            document.getElementById("valor" + key).value > 0
                          ) {
                            value.cantidad = document.getElementById(
                              "valor" + key
                            ).value;
                            ProductosSeleccionados.push(value);
                          }
                        });

                        ToastValidate.fire({
                          icon: "success",
                          title: "Proceso finalizado",
                        });

                        return ProductosSeleccionados;
                      }
                    },
                  });


                  const peticionPdf = await axios.post("/construccionPDF", {
                    cliente: informacionCliente,
                    productos: productosEscogidos,
                    usuarioCreador: profile,
                  });
                }
              }
            } else {
              resolve("Selecciona un cliente !");
            }
          });
        },
      });
    }
  };

  return (
    <>
      <a
        type="button"
        className="btn btn-success"
        onClick={() => {
          cotizacionBTN();
        }}
      >
        Crear cotización
      </a>
    </>
  );
}
