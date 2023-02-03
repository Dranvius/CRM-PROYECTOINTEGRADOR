//REACT HOOK CONTEXT
import { useContext,useState, useEffect} from "react";
//Constante de contexto de la lista
import {ListsContext} from '../context/ListsContext'
//SweetAlert2
import Swal from "sweetalert2";
//Axios
import axios from '../lib/axios.js'



export function TableList() {

  //USE STATE

  const [datos,setDatos ] =useState([]);

  //USE CONTEXT
  
  const ContextoObjetos = useContext(ListsContext)

  //USE EFFECT
  

  useEffect( () => { 
    async function fetchData() {
        try {
            const dats = await ContextoObjetos()
            setDatos(dats);
            console.log(datos);
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
  }, []);

  const deleteUser = async () => {

    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          true: 'Si',
          false: 'No',
        })
      }, 1000)
    })
    
    const { value: opcion } = await Swal.fire({
      icon: 'warning',
      title: '¿Desea Elminar este usuario?',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escoger un valor !'
        }
      }
    })
    
    if (opcion === true) {
      Swal.fire({ html: `La seleción es: ${opcion}` })

      const respuesta = await axios.post('/eliminarusuario',{
        datos: [datos.id_users]
      })
      
      console.log(respuesta);

    }else{

      Swal.fire({
        icon: 'warning',
        title: 'No desea eliminar nada',

        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes escoger un valor !'
          }
        }
      })

    }

  
  };

  const usuarios = [
    {
      nombre: "sergio",
      apellido: "linares",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 1023974646,
    },
    {
      nombre: "alexis",
      apellido: "ducuara",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 123456789,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
  ];

  
  return (
    <>
      <table className="table table-dark  table-hover">
        <thead>
          <tr>
            <td scope="col">#</td>
            <td scope="col">Nombre</td>
            <td scope="col">Apellido</td>
            <td scope="col">Cédula</td>
            <td scope="col">Correo</td>
            <td scope="col">Telefono</td>
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
              <td>
                <div className="btn-group">
                  <a href="#" className="btn btn-primary" onClick={() =>{
                  }}>
                    Editar
                  </a>
                  <a href="#" className="btn btn-danger" onClick={() =>{deleteUser()}}>
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
}
