const conexion = require("../config/db");

// Obtener los ejemplares de un título específico
const obtenerEjemplaresPorTitulo = (req, res) => {

    const { idTitulo } = req.params;

    const sql = "SELECT * FROM ejemplares WHERE id_titulo = ? ORDER BY id";

    conexion.query(sql, [idTitulo], (error, resultados) => {

        if (error) {
            console.log("Error al obtener ejemplares:", error);
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// Crear un ejemplar nuevo para un título
const crearEjemplar = (req, res) => {

    const { idTitulo, codigo } = req.body;

    const sql = `
    INSERT INTO ejemplares (id_titulo, codigo, estado)
    VALUES (?, ?, 'Disponible')
    `;

    conexion.query(sql, [idTitulo, codigo], (error) => {

        if (error) {
            console.log("Error al crear ejemplar:", error);
            return res.status(500).json(error);
        }

        res.json({ mensaje: "Ejemplar creado correctamente" });

    });

};

// Eliminar un ejemplar (solo si está Disponible, no si está Prestado)
const eliminarEjemplar = (req, res) => {

    const { id } = req.params;

    const sqlVerificar = "SELECT estado FROM ejemplares WHERE id = ?";

    conexion.query(sqlVerificar, [id], (error, resultados) => {

        if (error) {
            console.log("Error al verificar ejemplar:", error);
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: "Ejemplar no encontrado" });
        }

        if (resultados[0].estado === "Prestado") {
            return res.status(400).json({
                mensaje: "No se puede eliminar: el ejemplar está prestado actualmente"
            });
        }

        const sqlEliminar = "DELETE FROM ejemplares WHERE id = ?";

        conexion.query(sqlEliminar, [id], (error2) => {

            if (error2) {
                console.log("Error al eliminar ejemplar:", error2);
                return res.status(500).json(error2);
            }

            res.json({ mensaje: "Ejemplar eliminado" });

        });

    });

};

module.exports = {
    obtenerEjemplaresPorTitulo,
    crearEjemplar,
    eliminarEjemplar
};