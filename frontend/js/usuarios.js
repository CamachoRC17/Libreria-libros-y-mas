let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

mostrarUsuarios();

function agregarUsuario() {

    let nombre = document.getElementById("nombre").value;
    let documento = document.getElementById("documento").value;
    let correo = document.getElementById("correo").value;

    if(nombre==="" || documento==="" || correo===""){
        alert("Complete todos los campos");
        return;
    }

    let usuario = {
        id: Date.now(),
        nombre,
        documento,
        correo
    };

    usuarios.push(usuario);

    guardarUsuarios();

    mostrarUsuarios();

    limpiarCampos();
}

function mostrarUsuarios(){

    let tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML="";

    usuarios.forEach(usuario => {

        tabla.innerHTML += `

        <tr>

        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.documento}</td>
        <td>${usuario.correo}</td>

        <td>

        <button
        class="btn btn-warning btn-sm"
        onclick="editarUsuario(${usuario.id})">

        Editar

        </button>

        <button
        class="btn btn-danger btn-sm"
        onclick="eliminarUsuario(${usuario.id})">

        Eliminar

        </button>

        </td>

        </tr>

        `;
    });

}

function editarUsuario(id){

    let usuario = usuarios.find(u => u.id == id);

    usuario.nombre = prompt("Nombre", usuario.nombre);
    usuario.documento = prompt("Documento", usuario.documento);
    usuario.correo = prompt("Correo", usuario.correo);

    guardarUsuarios();

    mostrarUsuarios();

}

function eliminarUsuario(id){

    if(confirm("¿Eliminar usuario?")){

        usuarios = usuarios.filter(
            usuario => usuario.id != id
        );

        guardarUsuarios();

        mostrarUsuarios();

    }

}

function buscarUsuario(){

    let texto =
    document.getElementById("buscar")
    .value.toLowerCase();

    let filtrados = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto)
    );

    let tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML="";

    filtrados.forEach(usuario=>{

        tabla.innerHTML += `

        <tr>

        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.documento}</td>
        <td>${usuario.correo}</td>

        <td>

        <button
        class="btn btn-warning btn-sm"
        onclick="editarUsuario(${usuario.id})">

        Editar

        </button>

        <button
        class="btn btn-danger btn-sm"
        onclick="eliminarUsuario(${usuario.id})">

        Eliminar

        </button>

        </td>

        </tr>

        `;

    });

}

function guardarUsuarios(){

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}

function limpiarCampos(){

    document.getElementById("nombre").value="";
    document.getElementById("documento").value="";
    document.getElementById("correo").value="";

}