const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const myConnection = require("express-myconnection");
const app = express();
const productoRoutes = require("./routes/producto.routes");
const usuarioRoutes = require("./routes/usuario.routes");

//Settings
app.set("port", process.env.PORT || 3000);

//Middleware (peticiones antes de las peticiones de los usuarios)
app.use(cors());
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "tiendaitr",
      port: 3306,
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Customer Routes
app.use("/", productoRoutes);
app.use("/", usuarioRoutes);

//Starting server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
