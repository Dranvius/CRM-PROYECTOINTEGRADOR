//!pdf creator
import PdfPrinter from "pdfmake";
//!BD entrada
import pg from "pg";
import { ConfiguracionA } from "../database/config.js";
//!Modulo para crear Documentos o manej de archivos
import fs from "fs";
//! fonts para el pdf
import { fonts, llenadoPDF } from "../PDFs/pdfCreate.js";
//!PATH
import path from "path";

const printer = new PdfPrinter(fonts);
const pool = new pg.Pool(ConfiguracionA);

const BDatosUsarioSeleccionado = async (datos) => {
  try {
    const queryText =
      "SELECT * FROM client WHERE firstname = $1 AND lastname = $2 ";

    const nombresSeparados = datos.informacion.split(" ");

    const datosFinal = [nombresSeparados[0], nombresSeparados[1]];

    const res1 = await pool.query(queryText, datosFinal);

    return res1;
  } catch (error) {
    console.log("Error en la petición");
    console.error(error);
  }
};

export const ReqDatosUsuaruioSeleccionado = async (req, res) => {
  try {
    const peticion = await BDatosUsarioSeleccionado(req.body);
    res.json(peticion.rows);
  } catch (error) {
    console.log("Error en la ruta");
    console.error(error);
  }
};

//Creación PDF

const dataClient = async (clienteName) => {
  try {
    const queryText =
      "SELECT * FROM client WHERE firstname = $1 AND lastname =$2";

    const arr = [clienteName[0], clienteName[1]];

    const peticion = await pool.query(queryText, arr);

    return peticion.rows[0];
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

const llenadoTablaCotizacion = async (
  id,
  total,
  nombreUsuario,
  nombreCliente
) => {
  try {
    const queryText1 =
      "INSERT INTO sent_quotation(nombre_usuario,nomb_cli_coti) VALUES($1,$2)";

    const datosSendCotizacion = [nombreUsuario.name, nombreCliente[0]];

    const peticionSend = await pool.query(queryText1, datosSendCotizacion);

    console.log(peticionSend);

    const queryText0 =
      "INSERT INTO quotation(valor,cliente_coti) VALUES($1,$2)";
    const datosCotizacion = [total, id];

    const peticionCliente = await pool.query(queryText0, datosCotizacion);

    return peticionCliente;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

export const generarPDF = async (req, res) => {
  try {
    const queryText = " SELECT count(*)  FROM quotation";

    let conteo = await pool.query(queryText); //Conteo de la petición

    const userDats = await dataClient(req.body.cliente);

    //!Datos de usuario

    const datosPDF = llenadoPDF(
      req.body.cliente,
      req.body.productos,
      req.body.usuarioCreador
    );

    var pdfDoc = printer.createPdfKitDocument(datosPDF.pdf);
    pdfDoc.pipe(
      fs.createWriteStream(
        path.join(
          "./src",
          "/PDFs",
          "/Storage",
          "documento" + conteo.rows[0].count + ".pdf"
        )
      )
    );
    res.send("Cotización creada");
    pdfDoc.end();

    const finalProceso = await llenadoTablaCotizacion(
      userDats.id_client,
      datosPDF.resultado,
      req.body.usuarioCreador,
      req.body.cliente
    );

    console.log(finalProceso);
  } catch (error) {
    console.log("Error en la ruta");
    console.error(error);
  }
};


//!Estado de desarrollo

const dataCotizacion = async () => {
  try {
    const queryText =
      "SELECT * FROM quotation ORDER BY quotation.id_quotation";

    const peticion = await pool.query(queryText);

    return peticion.rows;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

export const enviarDatosCotizaciones = async (req, res) => {
  try {

    const peticion = await dataCotizacion();


    res.json(peticion);
  } catch (error) {
    console.log("Error en la ruta");
    console.error(error);
  }
};