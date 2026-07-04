const API_PRESTAMOS = "http://localhost:3000/api/prestamos";

mostrarReportes();

function mostrarReportes() {

    fetch(API_PRESTAMOS)
        .then(respuesta => respuesta.json())
        .then(prestamos => {

            let tabla = document.getElementById("tablaReportes");

            tabla.innerHTML = "";

            prestamos.forEach(prestamo => {

                tabla.innerHTML += `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${prestamo.usuario}</td>
                    <td>${prestamo.libro}</td>
                    <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
                    <td>${prestamo.estado}</td>
                </tr>
                `;

            });

        })
        .catch(error => {
            console.log("Error al obtener reportes:", error);
        });

}

function formatearFecha(fecha) {

    if (!fecha) return "-";

    let partes = fecha.slice(0, 10).split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}