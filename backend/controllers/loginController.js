const conexion = require("../config/db");
const bcrypt = require("bcrypt");

const iniciarSesion = (req, res) => {

    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ mensaje: "Complete todos los campos" });
    }

    const sql = "SELECT * FROM admins WHERE usuario = ?";

    conexion.query(sql, [usuario], (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        const admin = resultados[0];

        bcrypt.compare(password, admin.password, (error2, coincide) => {

            if (error2) {
                return res.status(500).json(error2);
            }

            if (!coincide) {
                return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
            }

            res.json({ mensaje: "Inicio de sesión exitoso" });

        });

    });

};

module.exports = { iniciarSesion };