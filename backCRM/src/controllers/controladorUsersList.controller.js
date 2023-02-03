//Base de datos
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";

const pool = new pg.Pool(ConfiguracionA);

//*-----------------Traer datos

//!BD
const traerDatosUsers = async () => {
  try {
    const queryText =
      "SELECT * FROM usuario INNER JOIN personaldats ON personaldats.id_personalid = usuario.id_users";

    const res1 = await pool.query(queryText);

    return res1;
  } catch (error) {
    console.log("Error en la peticiòn");
    console.error(error);
  }
};

//!req res
export const AllDats = async (req, res) => {
  try {
    const resBD = await traerDatosUsers();


    // res.json(resBD);
    res.send(resBD.rows)
  } catch (error) {
    console.log("Error ruta");
    console.error(error);
  }
};

//*-----------------Eliminar user

//!BD
const eliminar = async (dats) =>{
    try {
        const queryText =
          "UPDATE usuario SET status = null where id_users = $1";
    
            console.log(dats)


        const res1 = await pool.query(queryText,dats);
    
        return res1;
      } catch (error) {
        console.log("Error en la peticiòn");
        console.error(error);
      }

}

//Ruta de respuesta y traida
export const EliminarUsario = async (req, res) => {
    try {
      const resBD = await eliminar(req.body.datos);
  
      console.log(resBD)

      res.send('Usario eleminado');
    } catch (error) {
      console.log("Error ruta");
      console.error(error);
    }
  };

