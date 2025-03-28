import bcryptjs from 'bcryptjs'; //!Encargado de cifrar y descifrar contraseñas


//! PARA CREAR USUARIOS.
export const encrypt = async (textoAIncriptar) => {
    const hash = await bcryptjs.hash(textoAIncriptar,10);
    
    console.log(hash);
    return hash;
}

//! Desencriptaciòn.
export const compareEncrypt = async (passwordPlano,passwordEncriptado) =>{
    return await bcryptjs.compare(passwordPlano,passwordEncriptado);
}



