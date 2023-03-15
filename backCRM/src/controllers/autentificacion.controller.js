import jwt from "jsonwebtoken";
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";
import { compareEncrypt } from "../helpers/encryptThem.js";

const pool = new pg.Pool(ConfiguracionA);

//!Logica de logeo
export const loginHandler = async (req, res) => {

  try {
    const queryText =
      "SELECT * FROM usuario INNER JOIN personaldats ON personaldats.id_personalid = usuario.id_users WHERE usuario.email = $1";
    const res1 = await pool.query(queryText, [req.body.user]);
    const { email, pass, tipo } = res1.rows[0];


    //!Verificaciòn correo.
    if (!(email === req.body.user)) {
      return res.status(401).json({
        message: "Error en el correo",
      });
    }

    //!Verificaciòn contraseña.
    if (! await compareEncrypt(req.body.password, pass)) {
      return res.status(401).json({
        message: "Error en la contraseña",
      });
    }


    //!GENERAR TOKEN
    const token = jwt.sign(
      {
        user: req.body.user,
        // password: req.body.password, //!Posiblemente no
        role: tipo === false ? "administrador" : "gestor",
      },
      process.env.JWT_SECRET, //! FIRMA DE GENERACIÒN DE TOKEN 
      {
        expiresIn: "2h",
      }
    );

    //!DEVOLVER token

    return res.json({
      token,
    });


  } catch (error) {
    return res.status(401).json({
      message: "No autorizado 0 (No existe en la base de datos)",
    });
  }
};


export const profileHandler = (req, res) => {
  return res.json(req.user); //!Devuelve los datos del usuario
}