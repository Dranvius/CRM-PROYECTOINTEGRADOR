import jwt from "jsonwebtoken";
import pg from 'pg';
import { Configuracion } from "../database/config.js";

const pool = new pg.Pool(Configuracion);

export const verificador = (req, res, next) => {

  const autorizacion = req.headers.authorization; //!Header con e Token

  if (!autorizacion) {
    return res.status(401).json({
      message: "Error mal autentificado_1",
    });
  }



  //const token = autorizacion.split(' ')[1]; //!Toquen enviado por header

  if (!autorizacion) {
    return res.status(401).json({
      message: "Error mal autentificado_2",
    });
  }


  jwt.verify(autorizacion, "secret", async(err, user) => {
    if (err)
      return res.status(401).json({
        message: "No autorizado",
      });


      console.log('incio de la petición')

      try {
        const queryText = "SELECT * FROM usuario WHERE correo = $1 AND passwordUser = $2";
    
        const dat = [user.user,user.password];
        const res = await pool.query(queryText, dat);
  
        if(res.rows.length > 0){

          const datosUser ={
            name:res.rows[0].nombre,
            lastName: res.rows[0].apellido,
            tel:res.rows[0].telefono,
            email:res.rows[0].correo,
            password:res.rows[0].passworduser,
          }
          console.log("Fin")
          req.user = datosUser;
          next();
        }
      
      } catch (error) {
        return res.status(401).json({
          message: "No autorizado",
        });
      }

  });

};
