const conexion = require("../config/db");

// Obtener todos los préstamos, con nombre de usuario y título del libro
const obtenerPrestamos = (req, res) => {

    const sql = `
    SELECT
        prestamos.id,
        prestamos.idUsuario,
        prestamos.idEjemplar,
        usuarios.nombre AS usuario,
        titulos.titulo AS libro,
        ejemplares.codigo AS codigoEjemplar,
        prestamos.fechaPrestamo,
        prestamos.fechaDevolucion,
        prestamos.estado
    FROM prestamos
    INNER JOIN usuarios ON prestamos.idUsuario = usuarios.id
    INNER JOIN ejemplares ON prestamos.idEjemplar = ejemplares.id
    INNER JOIN titulos ON ejemplares.id_titulo = titulos.id
    ORDER BY prestamos.id DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.log("Error al obtener préstamos:", error);
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// Crear un préstamo
const crearPrestamo = (req, res) => {

    const { idUsuario, idEjemplar } = req.body;

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const sqlInsertar = `
    INSERT INTO prestamos
    (idUsuario, idEjemplar, fechaPrestamo, fechaDevolucion, estado)
    VALUES (?, ?, ?, NULL, 'Prestado')
    `;

    conexion.query(
        sqlInsertar,
        [idUsuario, idEjemplar, fechaHoy],
        (error) => {

            if (error) {
                console.log("Error al crear préstamo:", error);
                return res.status(500).json(error);
            }

            const sqlActualizarEjemplar =
            "UPDATE ejemplares SET estado = 'Prestado' WHERE id = ?";

            conexion.query(sqlActualizarEjemplar, [idEjemplar], (error2) => {

                if (error2) {
                    console.log("Error al actualizar ejemplar:", error2);
                    return res.status(500).json(error2);
                }

                res.json({
                    mensaje: "Préstamo registrado correctamente"
                });

            });

        }
    );

};

// Devolver un libro (marcar préstamo como devuelto)
const devolverPrestamo = (req, res) => {

    const { id } = req.params;

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const sqlBuscar = "SELECT idEjemplar FROM prestamos WHERE id = ?";

    conexion.query(sqlBuscar, [id], (error, resultados) => {

        if (error) {
            console.log("Error al buscar préstamo:", error);
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }

        const idEjemplar = resultados[0].idEjemplar;

        const sqlActualizarPrestamo = `
        UPDATE prestamos
        SET estado = 'Devuelto', fechaDevolucion = ?
        WHERE id = ?
        `;

        conexion.query(sqlActualizarPrestamo, [fechaHoy, id], (error2) => {

            if (error2) {
                console.log("Error al actualizar préstamo:", error2);
                return res.status(500).json(error2);
            }

            const sqlActualizarEjemplar =
            "UPDATE ejemplares SET estado = 'Disponible' WHERE id = ?";

            conexion.query(sqlActualizarEjemplar, [idEjemplar], (error3) => {

                if (error3) {
                    console.log("Error al actualizar ejemplar:", error3);
                    return res.status(500).json(error3);
                }

                res.json({
                    mensaje: "Libro devuelto correctamente"
                });

            });

        });

    });

};

module.exports = {
    obtenerPrestamos,
    crearPrestamo,
    devolverPrestamo
};