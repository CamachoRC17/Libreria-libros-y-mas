if(localStorage.getItem("sesion")!="activa"){

window.location.href="login.html";

}

function cerrarSesion(){

localStorage.removeItem("sesion");

window.location.href="login.html";

}

let libros =
JSON.parse(localStorage.getItem("libros"))
|| [];

let usuarios =
JSON.parse(localStorage.getItem("usuarios"))
|| [];

let prestamos =
JSON.parse(localStorage.getItem("prestamos"))
|| [];

document.getElementById(
"totalLibros"
).innerHTML=libros.length;

document.getElementById(
"totalUsuarios"
).innerHTML=usuarios.length;

document.getElementById(
"totalPrestamos"
).innerHTML=prestamos.length;