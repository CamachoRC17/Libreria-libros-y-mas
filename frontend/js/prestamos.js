const API_USUARIOS = "http://localhost:3000/api/usuarios";
const API_LIBROS = "http://localhost:3000/api/libros";
const API_PRESTAMOS = "http://localhost:3000/api/prestamos";

cargarUsuarios();
cargarLibros();
mostrarPrestamos();

function cargarUsuarios() {

    fetch(API_USUARIOS)
        .then(respuesta => respuesta.json())
        .then(usuarios => {

            let select = document.getElementById("usuario");

            select.innerHTML = "";

            usuarios.forEach(usuario => {
                select.innerHTML += `
                <option value="${usuario.id}">
                    ${usuario.nombre}
                </option>
                `;
            });

        })
        .catch(error => {
            console.log("Error al cargar usuarios:", error);
        });

}

function cargarLibros() {

    fetch(API_LIBROS)
        .then(respuesta => respuesta.json())
        .then(libros => {

            let select = document.getElementById("libro");

            select.innerHTML = "";

            let disponibles = libros.filter(libro => libro.estado === "Disponible");

            if (disponibles.length === 0) {

                select.innerHTML = `
                <option value="">No hay libros disponibles para prestar</option>
                `;

                select.disabled = true;

            } else {

                select.disabled = false;

                disponibles.forEach(libro => {
                    select.innerHTML += `
                    <option value="${libro.id}">
                        ${libro.titulo}
                    </option>
                    `;
                });

            }

        })
        .catch(error => {
            console.log("Error al cargar libros:", error);
        });

}

function realizarPrestamo() {

    let idUsuario = document.getElementById("usuario").value;
    let idLibro = document.getElementById("libro").value;

    if (idUsuario === "" || idLibro === "") {
        alert("No hay libros disponibles o usuarios registrados");
        return;
    }

    fetch(API_PRESTAMOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario, idLibro })
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarPrestamos();
            cargarLibros();
            alert("Préstamo registrado");
        })
        .catch(error => {
            console.log("Error al crear préstamo:", error);
        });

}

function formatearFecha(fecha) {

    if (!fecha) return "-";

    let partes = fecha.slice(0, 10).split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function mostrarPrestamos() {

    fetch(API_PRESTAMOS)
        .then(respuesta => respuesta.json())
        .then(prestamos => {

            let tabla = document.getElementById("tablaPrestamos");

            tabla.innerHTML = "";

            prestamos.forEach(prestamo => {

                let botonAccion = prestamo.estado === "Prestado"
                    ? `<button class="btn btn-warning btn-sm" onclick="devolverLibro(${prestamo.id})">Devolver</button>`
                    : `<span class="text-muted">—</span>`;

                tabla.innerHTML += `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${prestamo.usuario}</td>
                    <td>${prestamo.libro}</td>
                    <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
                    <td>${prestamo.estado}</td>
                    <td>${botonAccion}</td>
                </tr>
                `;

            });

        })
        .catch(error => {
            console.log("Error al obtener préstamos:", error);
        });

}

function devolverLibro(id) {

    fetch(`${API_PRESTAMOS}/${id}`, {
        method: "PUT"
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarPrestamos();
            cargarLibros();
            alert("Libro devuelto correctamente");
        })
        .catch(error => {
            console.log("Error al devolver libro:", error);
        });

}