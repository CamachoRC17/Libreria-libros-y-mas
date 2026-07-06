const conexion = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

const transportador = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_CLAVE
    }
});

const iniciarSesion = async (req, res) => {

    const { usuario, password, captcha } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ mensaje: "Complete todos los campos" });
    }

    if (!captcha) {
        return res.status(400).json({ mensaje: "No se pudo verificar el captcha" });
    }

    try {

        const verificacion = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${RECAPTCHA_SECRET}&response=${captcha}`
        });

        const resultadoCaptcha = await verificacion.json();

        console.log("Resultado captcha:", resultadoCaptcha);

        if (!resultadoCaptcha.success || resultadoCaptcha.score < 0.5) {
            return res.status(400).json({ mensaje: "Verificación de seguridad fallida, intente de nuevo" });
        }

    } catch (error) {
        console.log("Error verificando captcha:", error);
        return res.status(500).json({ mensaje: "Error verificando captcha" });
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


const solicitarRecuperacion = (req, res) => {

    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ mensaje: "Ingrese su correo" });
    }

    const sqlBuscar = "SELECT * FROM admins WHERE correo = ?";

    conexion.query(sqlBuscar, [correo], (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
     
            return res.json({ mensaje: "Si el correo existe, se envió un enlace de recuperación" });
        }

        const admin = resultados[0];

        const token = crypto.randomBytes(32).toString("hex");

        const expira = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        const sqlActualizar = `
        UPDATE admins
        SET resetToken = ?, resetTokenExpira = ?
        WHERE id = ?
        `;

        conexion.query(sqlActualizar, [token, expira, admin.id], (error2) => {

            if (error2) {
                return res.status(500).json(error2);
            }

            const enlace = `http://127.0.0.1:5500/frontend/restablecer.html?token=${token}`;

            transportador.sendMail({
                from: process.env.EMAIL_USUARIO,
                to: correo,
                subject: "Recuperación de contraseña - Biblioteca Virtual",
                html: `
                    <p>Recibiste este correo porque solicitaste recuperar tu contraseña.</p>
                    <p>Haz click en el siguiente enlace para crear una nueva contraseña (válido por 1 hora):</p>
                    <p><a href="${enlace}">${enlace}</a></p>
                    <p>Si no solicitaste esto, ignora este correo.</p>
                `
            }, (error3, info) => {

                if (error3) {
                    console.log("Error enviando correo:", error3);
                    return res.status(500).json({ mensaje: "Error enviando el correo" });
                }

                console.log("Correo enviado:", info.response);

                res.json({ mensaje: "Si el correo existe, se envió un enlace de recuperación" });

            });

        });

    });

};

// Restablecer contraseña usando el token
const restablecerContrasena = (req, res) => {

    const { token, nuevaPassword } = req.body;

    if (!token || !nuevaPassword) {
        return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    const sqlBuscar = `
    SELECT * FROM admins
    WHERE resetToken = ? AND resetTokenExpira > NOW()
    `;

    conexion.query(sqlBuscar, [token], (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(400).json({ mensaje: "El enlace es inválido o ya expiró" });
        }

        const admin = resultados[0];

        bcrypt.hash(nuevaPassword, 10, (error2, hash) => {

            if (error2) {
                return res.status(500).json(error2);
            }

            const sqlActualizar = `
            UPDATE admins
            SET password = ?, resetToken = NULL, resetTokenExpira = NULL
            WHERE id = ?
            `;

            conexion.query(sqlActualizar, [hash, admin.id], (error3) => {

                if (error3) {
                    return res.status(500).json(error3);
                }

                res.json({ mensaje: "Contraseña actualizada correctamente" });

            });

        });

    });

};

module.exports = { iniciarSesion, solicitarRecuperacion, restablecerContrasena };