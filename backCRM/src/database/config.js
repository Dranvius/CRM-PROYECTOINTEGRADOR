// export const ConfiguracionS = {
//     user: "postgres",
//     host: "localhost",
//     password: "333144388",
//     database: "Base de datos CRM",
//   };

// export const ConfiguracionA = {
//   user: "postgres",
//   host: "localhost",
//   password: "333144388",
//   database: "Crm",
//   port: 5432
// };

export const ConfiguracionA = {
  connectionString: process.env.PG_URL, // 🔑 URL que viene desde Render o .env local
  ssl: { rejectUnauthorized: false }    // 🔐 Necesario para Railway y otros servicios externos
};



// export const ConfiguracionA = process.env.DATABASE_URL;