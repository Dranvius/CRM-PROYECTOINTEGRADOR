//!pdf creator
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
//!BD entrada
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";
//!Modulo para crear Documentos o manej de archivos
import fs from "fs";
//! fonts para el pdf
import { llenadoPDF } from "../PDFs/pdfCreate.js";
//!PATH
import path from "path";
//!NODEMAILER
import nodemailer from "nodemailer";
//!Printer y pool
//const printer = new PdfPrinter(fonts);
const pool = new pg.Pool(ConfiguracionA);


//*El cliente seleccionado (TRAER DATOS)
const BDatosUsarioSeleccionado = async (datos) => {
  try {
    const queryText =
      "SELECT * FROM client WHERE firstname = $1 AND lastname = $2 ";

    const nombresSeparados = datos.informacion.split(" ");

    const datosFinal = [nombresSeparados[0], nombresSeparados[1]];

    const res1 = await pool.query(queryText, datosFinal);

    return res1;
  } catch (error) {

  }
};

export const ReqDatosUsuaruioSeleccionado = async (req, res) => {
  try {
    const peticion = await BDatosUsarioSeleccionado(req.body);
    res.json(peticion.rows);
  } catch (error) {

  }
};

//!Creación PDF

//!Traer los datos del cliente
const dataClient = async (clienteName) => {
  try {
    const queryText =
      "SELECT * FROM client WHERE firstname = $1 AND lastname =$2";

    const arr = [clienteName[0], clienteName[1]];
    const peticion = await pool.query(queryText, arr);

    return peticion.rows[0];
  } catch (error) {

  }
};

//!Llenado de las tablas de la base de datos.
const llenadoTablaCotizacion = async (
  id,
  total,
  nombreUsuario,
  nombreCliente,
  productos
) => {
  try {

    //!Ingresar en SENT_QUOTATION ENVIAR AUTOMATICAMENTE
    const queryText1 =
      "INSERT INTO sent_quotation(nombre_usuario,nomb_cli_coti) VALUES($1,$2)";

    const datosSendCotizacion = [nombreUsuario.name, nombreCliente[0]];
    const peticionSend = await pool.query(queryText1, datosSendCotizacion);



    //!LLENADO EN LA TABLA QUOTATION

    const queryText0 = "INSERT INTO quotation(valor_total,cliente_coti) VALUES($1,$2)";

    const datosCotizacion = [total, id];
    const peticionCliente = await pool.query(queryText0, datosCotizacion);

    //!lLENADO TABLA INTERMEDIA

    const queryText02 = "SELECT id_quotation FROM quotation";
    const peticionCotizacion = await pool.query(queryText02);

    //?ID de la cotización.
    const idcotizacion = peticionCotizacion.rows[peticionCotizacion.rows.length - 1].id_quotation;

    //?Introducción de los productos en la tabla intermedia. 

    productos.map((valor, key) => {
      let queryTexto1 =
        "INSERT INTO quotation_product(rela_cotiqp,rela_prodqp,cantidad) VALUES($1,$2,$3)";
      let valores = [idcotizacion, valor.id_product, valor.cantidad];
      pool.query(queryTexto1, valores);
    });

    return "TABLAS LLENADAS";
  } catch (error) {

  }
};

export const generarPDF = async (req, res) => {
  try {

    const queryText = " SELECT count(*)  FROM quotation";

    let conteo = await pool.query(queryText); //Conteo de la petición

    const userDats = await dataClient(req.body.cliente);

    //!Datos de usuario

    //!Los parametros de creación de PDF.
    const datosPDF = llenadoPDF(
      req.body.cliente,
      req.body.productos,
      req.body.usuarioCreador
    );

    //!Creador de transport para enviar mensajes (Configuración especial de windows)

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "linaresmodulareslm@gmail.com",
        pass: "cuglrkxinfwxtwfw",
      },
    });

    //!Donde se realiza la petición para la creación del documento.
    //?Acá es donde debo realizar el envio de la correo.

    //var pdfDoc = printer.createPdfKitDocument(datosPDF.pdf);

    const pdfDoc = pdfMake.createPdf(datosPDF.pdf, null, null, pdfFonts.pdfMake.vfs);


    pdfDoc.getBuffer((buffer) => {
      //! Datos de envio


      let message = {
        to: 'dranvius12@hotmail.com',
        subject: 'Cotización de los productos solicitado',
        text: 'Espero tenga un buen día. Comparto con usted la cotización de los productos solicitados',
        attachments: [
          //!Ligar el documento al mensaje Enviando
          {
            filename: 'archivo.pdf',
            content: buffer,
          },
        ],
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {

        } else {

        }
      });
    });

    //pdfDoc.end();

    // pdfDoc.pipe(
    //   fs.createWriteStream(
    //     path.join(
    //       "./src",
    //       "/PDFs",
    //       "/Storage",
    //       "documento" + conteo.rows[0].count + ".pdf"
    //     )
    //   )
    // );

    // pdfDoc.end();

    const precios = []; //!Array para los precios

    //!Suma de valores de cantidades
    req.body.productos.map((valor, key) => {
      // let primerParte = ((parseInt(valor.price) * parseInt(valor.discount.slice(0, -1))) / 100);
      // let segundaParte = (((parseInt(valor.price) * parseInt(valor.discount.slice(0, -1))) / 100) * parseInt(valor.cantidad));
      // let partetrestpuntocero =parseInt(valor.cantidad) * parseInt(valor.price);



      let terceraParte =
        parseInt(valor.cantidad) * parseInt(valor.price) -
        ((parseInt(valor.price) * parseInt(valor.discount.slice(0, -1))) /
          100) *
        parseInt(valor.cantidad);



      precios.push(terceraParte);
    });

    let subTotal = 0;

    precios.map((value) => (subTotal = subTotal + value));
    const Total = subTotal + (subTotal * 19) / 100;

    //!Llenado de base de datos.
    const finalProceso = await llenadoTablaCotizacion(
      userDats.id_client,
      Total,
      req.body.usuarioCreador,
      req.body.cliente,
      req.body.productos
    );



    res.json({
      valorTotal: Total,
      subTotal: subTotal,
      productos: req.body.productos,
      userCreador: req.body.usuarioCreador,
      datosCliente: req.body.cliente,
    });
  } catch (error) {

  }
};

//!Petición para mostrar cotizaciones 

const dataCotizacion = async () => {
  try {
    const queryText = "SELECT * FROM quotation INNER JOIN client ON quotation.cliente_coti = client.id_client  ORDER BY quotation.id_quotation";

    const peticion = await pool.query(queryText);

    return peticion.rows;
  } catch (error) {

  }
};

export const enviarDatosCotizaciones = async (req, res) => {
  try {
    const peticion = await dataCotizacion();

   

    res.json(peticion);
  } catch (error) {

  }
};


//!Traer datos de cotizaciones realizadas (Cantidades daos especificos)
const dataCotizacionRealizada = async (indice) =>{
  try {
    const solicitud = 'SELECT * FROM client INNER JOIN quotation ON quotation.cliente_coti = client.id_client INNER JOIN quotation_product ON quotation_product.rela_cotiqp = quotation.id_quotation INNER JOIN product ON product.id_product = quotation_product.rela_prodqp WHERE id_quotation = $1';
    const filtrado = [indice]

    const data = await pool.query(solicitud,filtrado);
    

    return data.rows;
  } catch (error) {
    console.error(error)
  }
}

//Request | Rest 

export const llevarInformacionACotizacion = async (req,res) =>{

  try {
    const peticion = await dataCotizacionRealizada(req.body.indice);

    

    res.json(peticion);
  } catch (error) {
    console.err(error);
  }

}