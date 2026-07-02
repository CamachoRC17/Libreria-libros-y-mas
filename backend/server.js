const express = require("express");
const cors = require("cors");

const librosRoutes = require("./routes/libros");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor Biblioteca Virtual funcionando");
});

app.use("/api/libros", librosRoutes);

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});