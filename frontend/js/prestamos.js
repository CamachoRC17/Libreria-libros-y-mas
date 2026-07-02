let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let libros = JSON.parse(localStorage.getItem("libros")) || [];

let prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

cargarUsuarios();
cargarLibros();
mostrarPrestamos();

function cargarUsuarios(){

let select = document.getElementById("usuario");

select.innerHTML = "";

usuarios.forEach(usuario=>{

select.innerHTML += `
<option value="${usuario.nombre}">
${usuario.nombre}
</option>
`;

});

}

function cargarLibros(){

let select = document.getElementById("libro");

select.innerHTML = "";

libros.forEach(libro=>{

if(libro.estado==="Disponible"){

select.innerHTML += `
<option value="${libro.id}">
${libro.titulo}
</option>
`;

}

});

}

function realizarPrestamo(){

let nombreUsuario =
document.getElementById("usuario").value;

let idLibro =
document.getElementById("libro").value;

if(idLibro===""){
alert("No hay libros disponibles");
return;
}

let libro =
libros.find(l=>l.id==idLibro);

let prestamo = {

id: Date.now(),

usuario: nombreUsuario,

libro: libro.titulo,

fecha: new Date().toLocaleDateString(),

estado: "Prestado"

};

prestamos.push(prestamo);

libro.estado = "Prestado";

localStorage.setItem(
"prestamos",
JSON.stringify(prestamos)
);

localStorage.setItem(
"libros",
JSON.stringify(libros)
);

mostrarPrestamos();

cargarLibros();

alert("Préstamo registrado");

}

function mostrarPrestamos(){

let tabla =
document.getElementById("tablaPrestamos");

tabla.innerHTML="";

prestamos.forEach(prestamo=>{

tabla.innerHTML += `

<tr>

<td>${prestamo.id}</td>

<td>${prestamo.usuario}</td>

<td>${prestamo.libro}</td>

<td>${prestamo.fecha}</td>

<td>${prestamo.estado}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="devolverLibro(${prestamo.id})">

Devolver

</button>

</td>

</tr>

`;

});

}

function devolverLibro(id){

let prestamo =
prestamos.find(p=>p.id==id);

if(prestamo.estado==="Devuelto"){

alert("Este libro ya fue devuelto");

return;

}

prestamo.estado="Devuelto";

let libro =
libros.find(
l=>l.titulo===prestamo.libro
);

libro.estado="Disponible";

localStorage.setItem(
"prestamos",
JSON.stringify(prestamos)
);

localStorage.setItem(
"libros",
JSON.stringify(libros)
);

mostrarPrestamos();

cargarLibros();

alert("Libro devuelto correctamente");

}