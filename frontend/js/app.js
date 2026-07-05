if (localStorage.getItem("sesion") !== "activa") {
    window.location.href = "login.html";
}

function cerrarSesion() {
    localStorage.removeItem("sesion");
    window.location.href = "login.html";
}

function mostrarAlerta(mensaje) {

    document.getElementById("mensajeAlerta").innerText = mensaje;

    let modal = new bootstrap.Modal(document.getElementById("modalAlerta"));

    modal.show();

}