const express = require("express");

const router = express.Router();

const {
    obtenerLibros,
    obtenerLibro,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} = require("../controllers/librosController");

router.get("/", obtenerLibros);

router.get("/:id", obtenerLibro);

router.post("/", crearLibro);

router.put("/:id", actualizarLibro);

router.delete("/:id", eliminarLibro);

module.exports = router;