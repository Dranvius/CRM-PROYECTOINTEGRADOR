import Express from "express";
import morgan from "morgan";
import pg from "pg";
import cors from "cors";
import router from "./routes/autentificacion.routes.js";
import profile from "./routes/peticionesProfilePage.routes.js";
import { ConfiguracionA } from "./database/config.js";
import ListUsers from "../src/routes/usersPage.routes.js";
import ListClients from "../src/routes/clientPage.routes.js";
import ListProducts from "../src/routes/products.Page.routes.js";
import cotizacionRoutes from "./routes/cotizacionProceso.routes.js";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool(ConfiguracionA);
const app = Express(); // 👈 Cambiado de App a app para mantener consistencia

// ✅ Cargar la URL del frontend desde las variables
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// MIDDLEWARES
app.use(morgan("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// RUTAS
app.use(router);
app.use(profile);
app.use(ListUsers);
app.use(ListClients);
app.use(ListProducts);
app.use(cotizacionRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("Saludo desde server");
});

// PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server conectado en puerto", PORT);
});
