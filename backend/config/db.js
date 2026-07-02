const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "biblioteca_virtual"
});

conexion.connect(error => {
    if (error) {
        console.log("Error de conexión:", error);
        return;
    }
    console.log("Base de datos conectada");
});

module.exports = conexion;