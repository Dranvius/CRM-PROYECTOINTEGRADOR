import jwt from "jsonwebtoken";
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";

const pool = new pg.Pool(ConfiguracionA);

export const verificador = (req, res, next) => {
  const autorizacion = req.headers.authorization; //!Header con el Token

  if (!autorizacion) {
    return res.status(401).json({
      message: "Error mal autentificado_1",
    });
  }

  //const token = autorizacion.split(' ')[1]; //!Toquen enviado por header

  if (!autorizacion) {
    //!Existencia de TOken en el header
    return res.status(401).json({
      message: "Error mal autentificado_2",
    });
  }

  

  try {
    jwt.verify(autorizacion, process.env.JWT_SECRET, async (err, user) => {
      //!Verificación del token

      if (err)
        return res.status(401).json({
          message: "Error en token",
        });

      try {
        const queryText =
          "SELECT * FROM  usuario INNER JOIN personaldats ON personaldats.id_personalid = USUARIO.id_users WHERE usuario.email = $1";

        const dat = [user.user];

        const res = await pool.query(queryText, dat);

        if (res.rows.length > 0) {
          const datosUser = {
            id: res.rows[0].id_personalid,
            name: res.rows[0].firstname,
            lastName: res.rows[0].lastname,
            tel: res.rows[0].numbercelphone,
            email: res.rows[0].email,
            status: res.rows[0].tipo,
          };

          //Enviando datos de la autentificación
          req.user = datosUser;

          next();
        }
      } catch (error) {
        console.error(error);
        return res.status(401).json({
          message: "No autorizado_4",
        });
      }
    });
  } catch (error) {
    console.error("Error en requerirAutentificador");
    console.error(error);
  }
};
