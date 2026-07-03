const express = require("express");

const router = express.Router();

const {
    obtenerPrestamos,
    crearPrestamo,
    devolverPrestamo
} = require("../controllers/prestamosController");

router.get("/", obtenerPrestamos);

router.post("/", crearPrestamo);

router.put("/:id", devolverPrestamo);

module.exports = router;