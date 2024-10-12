const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database.js");
const Router = require("./routes/routes.js");

const app = express();

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public")); // Sirve archivos estáticos como CSS

// Usar router
app.use(Router);

// Sincronizar modelos de Sequelize y levantar el servidor
sequelize
  .sync({ force: false }) // force: true recreará las tablas si es necesario
  .then(() => {
    console.log(
      "Conexión con la base de datos establecida y modelos sincronizados."
    );
    app.listen(5000, () =>
      console.log("Server running at http://localhost:5000")
    );
  })
  .catch((err) => {
    console.error(
      "Error al conectar con la base de datos o sincronizar los modelos:",
      err
    );
  });
