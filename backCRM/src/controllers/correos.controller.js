// Modulo para traer los correos 
//!BD entrada
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";
//!Modulo para crear Documentos o manej de archivos
import fs from "fs";
//!Api para correo electronico
//import { useState, useEffect } from 'react';

import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
//!Printer y pool
//const printer = new PdfPrinter(fonts);
const pool = new pg.Pool(ConfiguracionA);

//!Traer datos de correo electronico
export const loadEmails = async (req,res) => {

  //!Autenticarse con Google
  const authClient = new OAuth2Client ({
    keyFile: "../database/client_secret_379129023284-j6ud8kr2lgkk4vjfgg60q3hob6vvf04g.apps.googleusercontent.com.json",//?Clave de Email
    scopes: ["https://www.googleapis.com/auth/gmail.readonly"], //?Solo lectura
  });
  
  
  // Genera el enlace de autorización para el usuario
const authorizeUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });

  // Usa el código de autorización para obtener un token de acceso
const authCode = authorizeUrl;
try {
  const res = await authClient.getToken(authCode);
  tokens = res.tokens;
} catch (err) {
  console.error('Error al obtener el token de acceso:', err.message);
}

// Crea una nueva instancia del cliente de la API de Gmail usando el token de acceso
const gmailClient = google.gmail({ version: 'v1', auth: authClient });
const response = await gmailClient.users.messages.list({ userId: 'me' });
console.log(response.data);



  //Enviar datos
  res.json(response);
};

