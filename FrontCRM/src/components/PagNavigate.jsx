import {useState} from 'react'

export const PagNavigate =  (allDats) =>{


    

    const cambioPag = () =>{
        return allDats.slice(datosPorProceso,datosPorProceso+5)
    }
    



    return(

        

        <>
        
        <nav aria-label="Page navigation align-self-center ">
              <ul className="pagination  ">
                <li className="page-item disabled">
                  <a className="page-link" onClick={nextPage}>
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>

        </>


    )
}