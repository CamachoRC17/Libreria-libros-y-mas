const API_PRESTAMOS = "http://localhost:3000/api/prestamos";

let prestamos = [];

mostrarReportes();

function mostrarReportes() {

    fetch(API_PRESTAMOS)
        .then(respuesta => respuesta.json())
        .then(datos => {

            prestamos = datos;

            renderizarTabla(prestamos);

        })
        .catch(error => {
            console.log("Error al obtener reportes:", error);
        });

}

function renderizarTabla(listaPrestamos) {

    let tabla = document.getElementById("tablaReportes");

    tabla.innerHTML = "";

    listaPrestamos.forEach(prestamo => {

        tabla.innerHTML += `
        <tr>
            <td data-label="ID">${prestamo.id}</td>
            <td data-label="Usuario">${prestamo.usuario}</td>
            <td data-label="Libro">${prestamo.libro}</td>
            <td data-label="Fecha">${formatearFecha(prestamo.fechaPrestamo)}</td>
            <td data-label="Estado">${prestamo.estado}</td>
        </tr>
        `;

    });

}

function buscarReporte() {

    let textoId = document.getElementById("buscarId").value.toLowerCase();
    let textoUsuario = document.getElementById("buscarUsuario").value.toLowerCase();
    let textoLibro = document.getElementById("buscarLibro").value.toLowerCase();
    let textoFecha = document.getElementById("buscarFecha").value.toLowerCase();

    let filtrados = prestamos.filter(prestamo => {

        let fechaFormateada = formatearFecha(prestamo.fechaPrestamo).toLowerCase();

        let coincideId = String(prestamo.id).includes(textoId);
        let coincideUsuario = prestamo.usuario.toLowerCase().includes(textoUsuario);
        let coincideLibro = prestamo.libro.toLowerCase().includes(textoLibro);
        let coincideFecha = fechaFormateada.includes(textoFecha);

        return coincideId && coincideUsuario && coincideLibro && coincideFecha;

    });

    renderizarTabla(filtrados);

}

function formatearFecha(fecha) {

    if (!fecha) return "-";

    let partes = fecha.slice(0, 10).split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}