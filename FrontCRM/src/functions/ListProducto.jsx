export function ListProducto ({productos}){

    return (
        productos.map( (objeto, key) =>(

            `<tr>
                <th scope="row">{(key+1)}</th>
                  <td>{objeto.nameproduct}</td>
                  <td>{objeto.description}</td>
                  <td> 
                    <div class="number" id="aumentador">
                      <button type="button" class="btn btn-outline-primary" id="up" onclick={() => {console.log("Hola")}}>▲</button>
                      <input type="text" class="inputCount" value={1} id={"valor"+key}/>
                      <button type="button" class="btn btn-outline-primary" id="down" onclick={() => {console.log("Adios")}}>▼</button>
                    </div>
                  </td>
                  <td>
                    <div class="form-check" id="check">
                      <input class="form-check-input" type="checkbox" value="" id={"flexCheckIndeterminate"+key}/>
                    </div>
                  </td>
                  
             </tr>`
        )
        )
    )

}