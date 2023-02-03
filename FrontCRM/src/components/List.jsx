import {NavbarLinks} from '../components/NavbarLinks';


export function List() {
  //const ContextoVariableFuncional = useContext(ProyectoContext);







  const usuarios = [
    
  {
    nombre : "sergio",
    apellido: "linares",
  },
  {
    nombre : "alexis",
    apellido : "ducuara",  
  },
  {
    nombre:"Nappy",
    apellido:"blanco"
  }

]


  if (usuarios.length === 0) {
    return <h1>No hay tareas</h1>;
  } else
    return (
    <>
      
      <NavbarLinks />

      <div id='container-users'>

        <div id="list-users">

        <ul class="list-group">

        

        {usuarios.map((objeto, i) => (
          <div key={i}>
            <div class="list-group-item" > {objeto.nombre}  <a type="button" class="btn btn-outline-danger">Danger</a>  </div>
          </div>
        ))
        }


  {/* <li class="list-group-item">Cras justo odio <button>eliminar</button> </li> */}

        </ul>


        {/* {usuarios.map((objeto, i) => (
          <div key={i}>
            <h1>{objeto.nombre}</h1>
            <h1>{objeto.apellido}</h1>
          </div>
        ))
        } */}
        </div>

      </div>

      <div>


      </div>


     </>
    );
}