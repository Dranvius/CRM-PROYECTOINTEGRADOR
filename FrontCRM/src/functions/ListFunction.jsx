
import {editUser,deleteUser,editClient,deleteClient,editProduct,deleteProduct} from '../functions/FuncionesTablas'

export const ListFunction = ({prop,datos}) => {

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
              <td> <div id={(objeto.statusu===true)? "circleStatusGreen":"circleStatusRed"}></div></td>

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
            <td scope="col">Estado</td>
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
              <td> <div id={(objeto.statusc===true)? "circleStatusGreen":"circleStatusRed"}></div></td>
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
            <td scope="col">Estado</td>
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
              <td>
                <div id={(objeto.statusp===true)? "circleStatusGreen":"circleStatusRed"}></div>
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
              <td>{objeto.valor_total}</td>
              <td>{objeto.cliente_coti}</td>
            </tr>
          ))}
        </tbody>
      </table>)
    }
    
}