let prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

mostrarReportes();

function mostrarReportes(){

    let tabla = document.getElementById("tablaReportes");

    tabla.innerHTML = "";

    prestamos.forEach(prestamo=>{

        tabla.innerHTML += `

        <tr>

        <td>${prestamo.id}</td>
        <td>${prestamo.usuario}</td>
        <td>${prestamo.libro}</td>
        <td>${prestamo.fecha}</td>
        <td>${prestamo.estado}</td>

        </tr>

        `;
    });

}