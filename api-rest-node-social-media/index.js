const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Inicializar app

// Conectar a la base de datos
connection();

// Crear servidor Node
const app = express();
const port = 5501;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded
// app.set('view engine', 'pug');

// RUTAS
const user_route = require("./routes/user");
const post_route = require("./routes/publication");
const follow_route = require("./routes/follow");

// // Cargo las rutas
app.use("/api/user", user_route);
app.use("/api/publication", post_route);
app.use("/api/follow", follow_route);

// Rutas prueba hardcodeadas
app.get("/test", (req, res) => {

  console.log("The endpoint test is running");

  return res.status(200).json([{
    curso: "",
    autor: "",
    url: ""
  },
  {
    curso: "",
    autor: "",
    url: ""
  },
  ]);

});

app.get("/motor", (req, res) => {


  return res.render("motor", {
    id: 1,
    nombre: "",
    web: ""
  })

});

app.get("/", (req, res) => {


  return res.status(200).send(
    "<h1>Empezando a crear un api rest con node</h1>"
  );

});

// Crear servidor y escuchar peticiones http
app.listen(port, () => {
  console.log("The server is running in the port: " + port);
});


