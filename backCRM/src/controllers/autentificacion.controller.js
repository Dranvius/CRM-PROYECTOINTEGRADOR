import jwt from "jsonwebtoken";

export const loginHandler = (req, res) => {

  const token = jwt.sign(
    {
      user: req.body.user,
      password: req.body.password,
    },
    "secret", //!IMPORTANTE PARA EL CIFRADO DELAS CONTRASEÑAS
    {
      expiresIn: 60 * 30 * 24,
    }
  );
  return res.json({
    token,
  });
};

export const profileHandler = (req, res) => {
  return res.json(req.user);
};

//!TypeScript
// import {Request,Response} from 'express'

// export const loginHandler = (req:Request,res:Response) =>{

// }
