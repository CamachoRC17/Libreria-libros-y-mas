const express = require("express");

const router = express.Router();

const {
    iniciarSesion,
    solicitarRecuperacion,
    restablecerContrasena
} = require("../controllers/loginController");

router.post("/", iniciarSesion);

router.post("/recuperar", solicitarRecuperacion);

router.post("/restablecer", restablecerContrasena);

module.exports = router;