//*-------------------- Peticiones Profile Page


//*--------------------------------------------------------------------------------Name

//!Cambiar nombre Base de datos

const modificarNombre = async (dats) => {
  try {
    const queryText1 =
      "UPDATE usuario SET nombre = $1, apellido = $2  where correo = $3";

    const res1 = pool.query(queryText1, dats);
    console.log(res1);
  } catch (error) {
    console.log("Error en la petición");
    console.error(error);
  }
};

//?Cambiar nombre Ruta

export const changeName = (req, res) => {
  console.log("Peticion de cambio de nombre");

  try {
    modificarNombre(req.body);
    res.send("Operación realizada");
  } catch (error) {
    console.log(error);
  }
};

//*--------------------------------------------------------------------------------Password 

//!Cambiar Contraseña Base de datos

const modificarContraseña = async (dats) => {
  try {
    const queryText1 =
      "UPDATE usuario SET passworduser = $1  where correo = $2";

    const res1 = pool.query(queryText1, dats);
    console.log(res1);
  } catch (error) {
    console.log("Error en la petición");
    console.error(error);
  }
};

//?Cambiar contraseña Ruta

export const changePassword = (req, res) => {
  console.log("Peticion de cambio de contraseña");

  try {
    modificarContraseña(req.body);
    res.send("Operación realizada");
  } catch (error) {
    console.log(error);
  }
};