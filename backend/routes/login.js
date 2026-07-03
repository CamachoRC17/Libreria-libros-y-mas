const express = require("express");

const router = express.Router();

const { iniciarSesion } = require("../controllers/loginController");

router.post("/", iniciarSesion);

module.exports = router;