import Express from "express";
import morgan from "morgan";
import Colors from "colors";
import pg from "pg";
import cors from "cors";
import router from "./routes/autentificacion.routes.js";
import profile from "./routes/peticionesProfilePage.routes.js";
import { Configuracion } from "./database/config.js";


const pool = new pg.Pool(Configuracion);

const App = Express();

//! DEFAULT Middlerwares

App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
App.use(morgan("dev"));
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

//?RUTAS

App.use(router); 
App.use(profile);

//?Default Route

App.get("/", (req, res) => {
  res.send("Saludo desde server");
});

App.listen(3000);

console.log("Server conectado 3000".bgRed);
