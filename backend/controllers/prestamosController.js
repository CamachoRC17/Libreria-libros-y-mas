const conexion = require("../config/db");

// Obtener todos los préstamos, con nombre de usuario y título del libro
const obtenerPrestamos = (req, res) => {

    const sql = `
    SELECT
        prestamos.id,
        prestamos.idUsuario,
        prestamos.idLibro,
        usuarios.nombre AS usuario,
        libros.titulo AS libro,
        prestamos.fechaPrestamo,
        prestamos.fechaDevolucion,
        prestamos.estado
    FROM prestamos
    INNER JOIN usuarios ON prestamos.idUsuario = usuarios.id
    INNER JOIN libros ON prestamos.idLibro = libros.id
    ORDER BY prestamos.id DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// se crea un préstamo
const crearPrestamo = (req, res) => {

    const { idUsuario, idLibro } = req.body;

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const sqlInsertar = `
    INSERT INTO prestamos
    (idUsuario, idLibro, fechaPrestamo, fechaDevolucion, estado)
    VALUES (?, ?, ?, NULL, 'Prestado')
    `;

    conexion.query(
        sqlInsertar,
        [idUsuario, idLibro, fechaHoy],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            // Al crear el préstamo, ya se marca el libro como "Prestado"
            const sqlActualizarLibro =
            "UPDATE libros SET estado = 'Prestado' WHERE id = ?";

            conexion.query(sqlActualizarLibro, [idLibro], (error2) => {

                if (error2) {
                    return res.status(500).json(error2);
                }

                res.json({
                    mensaje: "Préstamo registrado correctamente"
                });

            });

        }
    );

};

// Cuando se devulve un libro (marcar préstamo como devuelto)
const devolverPrestamo = (req, res) => {

    const { id } = req.params;

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const sqlBuscar = "SELECT idLibro FROM prestamos WHERE id = ?";

    conexion.query(sqlBuscar, [id], (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }

        const idLibro = resultados[0].idLibro;

        const sqlActualizarPrestamo = `
        UPDATE prestamos
        SET estado = 'Devuelto', fechaDevolucion = ?
        WHERE id = ?
        `;

        conexion.query(sqlActualizarPrestamo, [fechaHoy, id], (error2) => {

            if (error2) {
                return res.status(500).json(error2);
            }

            const sqlActualizarLibro =
            "UPDATE libros SET estado = 'Disponible' WHERE id = ?";

            conexion.query(sqlActualizarLibro, [idLibro], (error3) => {

                if (error3) {
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