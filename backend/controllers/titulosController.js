const conexion = require("../config/db");

// Obtener todos los títulos, con la cantidad de ejemplares disponibles y totales
const obtenerTitulos = (req, res) => {

    const sql = `
    SELECT
        titulos.id,
        titulos.isbn,
        titulos.titulo,
        titulos.autor,
        titulos.categoria,
        titulos.anio,
        COUNT(ejemplares.id) AS totalEjemplares,
        SUM(CASE WHEN ejemplares.estado = 'Disponible' THEN 1 ELSE 0 END) AS disponibles
    FROM titulos
    LEFT JOIN ejemplares ON ejemplares.id_titulo = titulos.id
    GROUP BY titulos.id
    ORDER BY titulos.id DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.log("Error al obtener títulos:", error);
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// Crear un título nuevo (sin ejemplares todavía)
const crearTitulo = (req, res) => {

    const { isbn, titulo, autor, categoria, anio } = req.body;

    const sql = `
    INSERT INTO titulos (isbn, titulo, autor, categoria, anio)
    VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(sql, [isbn, titulo, autor, categoria, anio], (error, resultado) => {

        if (error) {
            console.log("Error al crear título:", error);
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Título creado correctamente",
            idTitulo: resultado.insertId
        });

    });

};

// Actualizar un título
const actualizarTitulo = (req, res) => {

    const { id } = req.params;
    const { isbn, titulo, autor, categoria, anio } = req.body;

    const sql = `
    UPDATE titulos
    SET isbn = ?, titulo = ?, autor = ?, categoria = ?, anio = ?
    WHERE id = ?
    `;

    conexion.query(sql, [isbn, titulo, autor, categoria, anio, id], (error) => {

        if (error) {
            console.log("Error al actualizar título:", error);
            return res.status(500).json(error);
        }

        res.json({ mensaje: "Título actualizado" });

    });

};

// Eliminar un título (solo si no tiene ejemplares asociados)
const eliminarTitulo = (req, res) => {

    const { id } = req.params;

    const sqlVerificar = "SELECT COUNT(*) AS total FROM ejemplares WHERE id_titulo = ?";

    conexion.query(sqlVerificar, [id], (error, resultados) => {

        if (error) {
            console.log("Error al verificar ejemplares:", error);
            return res.status(500).json(error);
        }

        if (resultados[0].total > 0) {
            return res.status(400).json({
                mensaje: "No se puede eliminar: el título tiene ejemplares registrados"
            });
        }

        const sqlEliminar = "DELETE FROM titulos WHERE id = ?";

        conexion.query(sqlEliminar, [id], (error2) => {

            if (error2) {
                console.log("Error al eliminar título:", error2);
                return res.status(500).json(error2);
            }

            res.json({ mensaje: "Título eliminado" });

        });

    });

};

module.exports = {
    obtenerTitulos,
    crearTitulo,
    actualizarTitulo,
    eliminarTitulo
};