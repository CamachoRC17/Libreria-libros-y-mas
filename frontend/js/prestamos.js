const API_USUARIOS = "http://localhost:3000/api/usuarios";
const API_TITULOS = "http://localhost:3000/api/titulos";
const API_PRESTAMOS = "http://localhost:3000/api/prestamos";

let titulosDisponibles = [];

cargarUsuarios();
cargarTitulos();
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

function cargarTitulos() {

    fetch(API_TITULOS)
        .then(respuesta => respuesta.json())
        .then(titulos => {

            titulosDisponibles = titulos.filter(t => t.disponibles > 0);

            let select = document.getElementById("libro");

            select.innerHTML = "";

            if (titulosDisponibles.length === 0) {

                select.innerHTML = `
                <option value="">No hay libros disponibles para prestar</option>
                `;

                select.disabled = true;

            } else {

                select.disabled = false;

                titulosDisponibles.forEach(titulo => {
                    select.innerHTML += `
                    <option value="${titulo.id}">
                        ${titulo.titulo} (${titulo.disponibles} disponibles)
                    </option>
                    `;
                });

            }

        })
        .catch(error => {
            console.log("Error al cargar títulos:", error);
        });

}

function realizarPrestamo() {

    let idUsuario = document.getElementById("usuario").value;
    let idTitulo = document.getElementById("libro").value;

    if (idUsuario === "" || idTitulo === "") {
        mostrarAlerta("No hay libros disponibles o usuarios registrados");
        return;
    }

    fetch(`http://localhost:3000/api/ejemplares/titulo/${idTitulo}`)
        .then(respuesta => respuesta.json())
        .then(ejemplares => {

            let ejemplarDisponible = ejemplares.find(e => e.estado === "Disponible");

            if (!ejemplarDisponible) {
                mostrarAlerta("No hay ejemplares disponibles de este título");
                return;
            }

            return fetch(API_PRESTAMOS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idUsuario, idEjemplar: ejemplarDisponible.id })
            });

        })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarPrestamos();
            cargarTitulos();
            mostrarAlerta("Préstamo registrado");
        })
        .catch(error => {
            console.log("Error al crear préstamo:", error);
        });

}

function mostrarPrestamos() {

    fetch(API_PRESTAMOS)
        .then(respuesta => respuesta.json())
        .then(prestamos => {

            let tabla = document.getElementById("tablaPrestamos");

            tabla.innerHTML = "";

            prestamos.forEach(prestamo => {

                let botonAccion = prestamo.estado === "Prestado"
                    ? `<button class="btn btn-editar btn-sm" onclick="abrirModalDevolucion(${prestamo.id})">Devolver</button>`
                    : `<span class="text-muted">—</span>`;

                tabla.innerHTML += `
                <tr>
                    <td data-label="ID">${prestamo.id}</td>
                    <td data-label="Usuario">${prestamo.usuario}</td>
                    <td data-label="Libro">${prestamo.libro} (${prestamo.codigoEjemplar})</td>
                    <td data-label="Fecha">${formatearFecha(prestamo.fechaPrestamo)}</td>
                    <td data-label="Estado">${prestamo.estado}</td>
                    <td data-label="Acción">${botonAccion}</td>
                </tr>
                `;

            });

        })
        .catch(error => {
            console.log("Error al obtener préstamos:", error);
        });

}

let idPrestamoActual = null;

function abrirModalDevolucion(id) {

    idPrestamoActual = id;

    let modal = new bootstrap.Modal(document.getElementById("modalConfirmarDevolucion"));

    modal.show();

}

function confirmarDevolucion() {

    fetch(`${API_PRESTAMOS}/${idPrestamoActual}`, {
        method: "PUT"
    })
        .then(respuesta => respuesta.json())
        .then(() => {

            mostrarPrestamos();
            cargarTitulos();

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmarDevolucion"));

            modal.hide();

        })
        .catch(error => {
            console.log("Error al devolver libro:", error);
        });

}

function formatearFecha(fecha) {

    if (!fecha) return "-";

    let partes = fecha.slice(0, 10).split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}