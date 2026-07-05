const API_URL = "http://localhost:3000/api/usuarios";

let usuarios = [];

mostrarUsuarios();

function agregarUsuario() {

    let nombre = document.getElementById("nombre").value;
    let documento = document.getElementById("documento").value;
    let correo = document.getElementById("correo").value;

    if (nombre === "" || documento === "" || correo === "") {
        mostrarAlerta("Complete todos los campos");
        return;
    }

    if (!/^[0-9]{6,12}$/.test(documento)) {
        mostrarAlerta("El documento debe tener solo números, entre 6 y 12 dígitos");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarAlerta("Ingrese un correo electrónico válido");
        return;
    }

    let correoRepetido = usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase());

    if (correoRepetido) {
        mostrarAlerta("Ya existe un usuario registrado con ese correo");
        return;
    }

    let usuario = { nombre, documento, correo };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarUsuarios();
            limpiarCampos();
        })
        .catch(error => {
            console.log("Error al crear usuario:", error);
        });

}

function mostrarUsuarios() {

    fetch(API_URL)
        .then(respuesta => respuesta.json())
        .then(datos => {

            usuarios = datos;

            renderizarTabla(usuarios);

        })
        .catch(error => {
            console.log("Error al obtener usuarios:", error);
        });

}

function editarUsuario(id) {

    let usuario = usuarios.find(u => u.id == id);

    document.getElementById("editId").value = usuario.id;
    document.getElementById("editNombre").value = usuario.nombre;
    document.getElementById("editDocumento").value = usuario.documento;
    document.getElementById("editCorreo").value = usuario.correo;

    let modal = new bootstrap.Modal(document.getElementById("modalEditarUsuario"));

    modal.show();

}

function guardarEdicionUsuario() {

    let id = document.getElementById("editId").value;
    let nombre = document.getElementById("editNombre").value;
    let documento = document.getElementById("editDocumento").value;
    let correo = document.getElementById("editCorreo").value;

    if (nombre === "" || documento === "" || correo === "") {
        mostrarAlerta("Complete todos los campos");
        return;
    }

    if (!/^[0-9]{6,12}$/.test(documento)) {
        mostrarAlerta("El documento debe tener solo números, entre 6 y 12 dígitos");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarAlerta("Ingrese un correo electrónico válido");
        return;
    }

    let correoRepetido = usuarios.some(u =>
        u.correo.toLowerCase() === correo.toLowerCase() && u.id != id
    );

    if (correoRepetido) {
        mostrarAlerta("Ya existe un usuario registrado con ese correo");
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, documento, correo })
    })
        .then(respuesta => respuesta.json())
        .then(() => {

            mostrarUsuarios();

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarUsuario"));

            modal.hide();

        })
        .catch(error => {
            console.log("Error al actualizar usuario:", error);
        });

}

let idUsuarioAEliminar = null;

function eliminarUsuario(id) {

    idUsuarioAEliminar = id;

    let modal = new bootstrap.Modal(document.getElementById("modalConfirmarEliminarUsuario"));

    modal.show();

}

function confirmarEliminarUsuario() {

    fetch(`${API_URL}/${idUsuarioAEliminar}`, {
        method: "DELETE"
    })
        .then(respuesta => respuesta.json())
        .then(() => {

            mostrarUsuarios();

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmarEliminarUsuario"));

            modal.hide();

        })
        .catch(error => {
            console.log("Error al eliminar usuario:", error);
        });

}

function renderizarTabla(listaUsuarios) {

    let tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    listaUsuarios.forEach(usuario => {

        tabla.innerHTML += `
        <tr>
            <td data-label="ID">${usuario.id}</td>
            <td data-label="Nombre">${usuario.nombre}</td>
            <td data-label="Documento">${usuario.documento}</td>
            <td data-label="Correo">${usuario.correo}</td>
            <td data-label="Acciones">
                <button class="btn btn-editar btn-sm" onclick="editarUsuario(${usuario.id})">Editar</button>
                <button class="btn btn-eliminar btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });

}

function buscarUsuario() {

    let texto = document.getElementById("buscar").value.toLowerCase();

    let filtrados = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto)
    );

    renderizarTabla(filtrados);

}

function limpiarCampos() {

    document.getElementById("nombre").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("correo").value = "";

}