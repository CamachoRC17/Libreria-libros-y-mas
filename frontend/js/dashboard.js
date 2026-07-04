if (localStorage.getItem("sesion") != "activa") {

    window.location.href = "login.html";

}

function cerrarSesion() {

    localStorage.removeItem("sesion");

    window.location.href = "login.html";

}

const API_LIBROS = "http://localhost:3000/api/libros";
const API_USUARIOS = "http://localhost:3000/api/usuarios";
const API_PRESTAMOS = "http://localhost:3000/api/prestamos";

cargarEstadisticas();

function cargarEstadisticas() {

    fetch(API_LIBROS)
        .then(respuesta => respuesta.json())
        .then(libros => {
            document.getElementById("totalLibros").innerHTML = libros.length;
        })
        .catch(error => {
            console.log("Error al cargar libros:", error);
        });

    fetch(API_USUARIOS)
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            document.getElementById("totalUsuarios").innerHTML = usuarios.length;
        })
        .catch(error => {
            console.log("Error al cargar usuarios:", error);
        });

    fetch(API_PRESTAMOS)
        .then(respuesta => respuesta.json())
        .then(prestamos => {
            document.getElementById("totalPrestamos").innerHTML = prestamos.length;
        })
        .catch(error => {
            console.log("Error al cargar préstamos:", error);
        });

}