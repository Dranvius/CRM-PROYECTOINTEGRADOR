import Express from "express";
import morgan from "morgan";
import pg from "pg";
import cors from "cors";
import router from "./routes/autentificacion.routes.js";
import profile from "./routes/peticionesProfilePage.routes.js";
import { ConfiguracionA } from "./database/config.js";
import ListUsers from "../src/routes/usersPage.routes.js";
import ListClients  from "../src/routes/clientPage.routes.js";
import ListProducts from "../src/routes/products.Page.routes.js"
import cotizacionRoutes from './routes/cotizacionProceso.routes.js';
import ListCorreos from './routes/correo.routes.js';
import dotenv from 'dotenv'
const pool = new pg.Pool(ConfiguracionA);

const App = Express();

dotenv.config()

//!Port

//const port = process.env.PORT || 3000; //!Variable de entorno o del sistema

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
//App.use(ListCorreos);  //Para correos;
App.use(profile);
App.use(ListUsers);
App.use(ListClients);
App.use(ListProducts);
App.use(cotizacionRoutes);


//?Default Route

App.get("/", (req, res) => {
  res.send("Saludo desde server");
});

App.listen(3000);

console.log("Server conectado 3000");
