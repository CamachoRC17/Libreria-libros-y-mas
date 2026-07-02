function iniciarSesion(){

let usuario =
document.getElementById("usuario").value;

let password =
document.getElementById("password").value;

if(usuario=="admin" && password=="12345"){

localStorage.setItem(
"sesion",
"activa"
);

window.location.href="index.html";

}
else{

document.getElementById(
"mensaje"
).innerHTML=
"Usuario o contraseña incorrectos";

}

}