const express = require("express");

const router = express.Router();

const {
    obtenerEjemplaresPorTitulo,
    crearEjemplar,
    eliminarEjemplar
} = require("../controllers/ejemplaresController");

router.get("/titulo/:idTitulo", obtenerEjemplaresPorTitulo);

router.post("/", crearEjemplar);

router.delete("/:id", eliminarEjemplar);

module.exports = router;