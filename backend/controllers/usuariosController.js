const conexion = require("../config/db");

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {

    const sql = "SELECT * FROM usuarios";

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// Obtener un usuario por ID
const obtenerUsuario = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM usuarios WHERE id = ?";

    conexion.query(sql, [id], (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados[0]);

    });

};

// Crear usuario
const crearUsuario = (req, res) => {

    const { nombre, documento, correo } = req.body;

    const sql = `
    INSERT INTO usuarios
    (nombre, documento, correo)
    VALUES (?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, documento, correo],
        (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Usuario creado correctamente"
            });

        }
    );

};

// Actualizar usuario
const actualizarUsuario = (req, res) => {

    const { id } = req.params;

    const { nombre, documento, correo } = req.body;

    const sql = `
    UPDATE usuarios
    SET nombre=?,
        documento=?,
        correo=?
    WHERE id=?
    `;

    conexion.query(
        sql,
        [nombre, documento, correo, id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Usuario actualizado"
            });

        }
    );

};

// Eliminar usuario
const eliminarUsuario = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM usuarios WHERE id=?";

    conexion.query(sql, [id], (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Usuario eliminado"
        });

    });

};

module.exports = {

    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario

};