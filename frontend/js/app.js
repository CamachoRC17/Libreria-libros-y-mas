if(localStorage.getItem("sesion")!=="activa"){
    window.location.href="login.html";
}

function cerrarSesion(){
    localStorage.removeItem("sesion");
    window.location.href="login.html";
}

function mostrarAlerta(mensaje) {

    document.getElementById("mensajeAlerta").innerText = mensaje;
    let modal = new bootstrap.Modal(document.getElementById("modalAlerta"));
    modal.show();

}

let libros = JSON.parse(localStorage.getItem("libros")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let prestados = libros.filter(libro =>
    libro.estado === "Prestado"
);

document.getElementById("totalLibros").innerHTML = libros.length;
document.getElementById("totalUsuarios").innerHTML = usuarios.length;
document.getElementById("totalPrestados").innerHTML = prestados.length;
