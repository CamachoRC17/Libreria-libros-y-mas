const express = require("express");

const router = express.Router();

const {
    obtenerTitulos,
    crearTitulo,
    actualizarTitulo,
    eliminarTitulo
} = require("../controllers/titulosController");

router.get("/", obtenerTitulos);

router.post("/", crearTitulo);

router.put("/:id", actualizarTitulo);

router.delete("/:id", eliminarTitulo);

module.exports = router;