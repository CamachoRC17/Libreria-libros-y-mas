const conexion = require("../config/db");

// Obtener todos los libros
const obtenerLibros = (req, res) => {

    const sql = "SELECT * FROM libros";

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// Obtener un libro por ID
const obtenerLibro = (req, res) => {

    const { id } = req.params;

    const sql =
    "SELECT * FROM libros WHERE id = ?";

    conexion.query(sql,[id],
    (error,resultados)=>{

        if(error){
            return res.status(500).json(error);
        }

        res.json(resultados[0]);

    });

};

// Crear libro
const crearLibro = (req,res)=>{

    const {
        titulo,
        autor,
        categoria,
        anio
    } = req.body;

    const sql = `
    INSERT INTO libros
    (titulo,autor,categoria,anio,estado)
    VALUES (?,?,?,?,?)
    `;

    conexion.query(
        sql,
        [
            titulo,
            autor,
            categoria,
            anio,
            "Disponible"
        ],
        (error,resultado)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Libro creado correctamente"
            });

        }
    );

};

// Actualizar libro
const actualizarLibro = (req,res)=>{

    const { id } = req.params;

    const {
        titulo,
        autor,
        categoria,
        anio
    } = req.body;

    const sql = `
    UPDATE libros
    SET titulo=?,
        autor=?,
        categoria=?,
        anio=?
    WHERE id=?
    `;

    conexion.query(
        sql,
        [
            titulo,
            autor,
            categoria,
            anio,
            id
        ],
        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Libro actualizado"
            });

        }
    );

};

// Eliminar libro
const eliminarLibro = (req,res)=>{

    const { id } = req.params;

    const sql =
    "DELETE FROM libros WHERE id=?";

    conexion.query(
        sql,
        [id],
        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Libro eliminado"
            });

        }
    );

};

module.exports = {

    obtenerLibros,
    obtenerLibro,
    crearLibro,
    actualizarLibro,
    eliminarLibro

};