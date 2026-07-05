const API_URL = "http://localhost:3000/api/libros";

let libros = [];

mostrarLibros();

function agregarLibro() {

    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let categoria = document.getElementById("categoria").value;
    let anio = document.getElementById("anio").value;

    if (
        titulo === "" ||
        autor === "" ||
        categoria === "" ||
        anio === ""
    ) {
        alert("Complete todos los campos");
        return;
    }

    

    let libro = { titulo, autor, categoria, anio };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro)
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarLibros();
            limpiarCampos();
        })
        .catch(error => {
            console.log("Error al crear libro:", error);
        });

}

function mostrarLibros() {

    fetch(API_URL)
        .then(respuesta => respuesta.json())
        .then(datos => {

            libros = datos;

            renderizarTabla(libros);

        })
        .catch(error => {
            console.log("Error al obtener libros:", error);
        });

}

function editarLibro(id) {

    let libro = libros.find(l => l.id == id);

    document.getElementById("editId").value = libro.id;
    document.getElementById("editTitulo").value = libro.titulo;
    document.getElementById("editAutor").value = libro.autor;
    document.getElementById("editCategoria").value = libro.categoria;
    document.getElementById("editAnio").value = libro.anio;

    let modal = new bootstrap.Modal(document.getElementById("modalEditarLibro"));

    modal.show();

}

function guardarEdicionLibro() {

    let id = document.getElementById("editId").value;
    let titulo = document.getElementById("editTitulo").value;
    let autor = document.getElementById("editAutor").value;
    let categoria = document.getElementById("editCategoria").value;
    let anio = document.getElementById("editAnio").value;

    if (titulo === "" || autor === "" || categoria === "" || anio === "") {
        alert("Complete todos los campos");
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, categoria, anio })
    })
        .then(respuesta => respuesta.json())
        .then(() => {

            mostrarLibros();

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarLibro"));

            modal.hide();

        })
        .catch(error => {
            console.log("Error al actualizar libro:", error);
        });

}

let idLibroAEliminar = null;

function eliminarLibro(id) {

    idLibroAEliminar = id;

    let modal = new bootstrap.Modal(document.getElementById("modalConfirmarEliminarLibro"));

    modal.show();

}

function confirmarEliminarLibro() {

    fetch(`${API_URL}/${idLibroAEliminar}`, {
        method: "DELETE"
    })
        .then(respuesta => respuesta.json())
        .then(() => {

            mostrarLibros();

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmarEliminarLibro"));

            modal.hide();

        })
        .catch(error => {
            console.log("Error al eliminar libro:", error);
        });

}

function renderizarTabla(listaLibros) {

    let tabla = document.getElementById("tablaLibros");

    tabla.innerHTML = "";

    listaLibros.forEach(libro => {

        tabla.innerHTML += `
        <tr>
            <td data-label="ID">${libro.id}</td>
            <td data-label="Título">${libro.titulo}</td>
            <td data-label="Autor">${libro.autor}</td>
            <td data-label="Categoría">${libro.categoria}</td>
            <td data-label="Año">${libro.anio}</td>
            <td data-label="Estado">${libro.estado}</td>
            <td data-label="Acciones">
                <button class="btn btn-editar btn-sm" onclick="editarLibro(${libro.id})">Editar</button>
                <button class="btn btn-eliminar btn-sm" onclick="eliminarLibro(${libro.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });

}

function buscarLibro() {

    let texto = document.getElementById("buscar").value.toLowerCase();

    let filtrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto)
    );

    renderizarTabla(filtrados);

}

function limpiarCampos() {

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("anio").value = "";

}