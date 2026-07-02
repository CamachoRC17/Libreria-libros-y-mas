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

function buscarLibro() {

    let texto = document.getElementById("buscar").value.toLowerCase();

    let filtrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto)
    );

    renderizarTabla(filtrados);

}

function editarLibro(id) {

    let libro = libros.find(l => l.id == id);

    let titulo = prompt("Título", libro.titulo);
    let autor = prompt("Autor", libro.autor);
    let categoria = prompt("Categoría", libro.categoria);
    let anio = prompt("Año", libro.anio);

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, categoria, anio })
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarLibros();
        })
        .catch(error => {
            console.log("Error al actualizar libro:", error);
        });

}

function eliminarLibro(id) {

    if (confirm("¿Eliminar libro?")) {

        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
            .then(respuesta => respuesta.json())
            .then(() => {
                mostrarLibros();
            })
            .catch(error => {
                console.log("Error al eliminar libro:", error);
            });

    }

}

function renderizarTabla(listaLibros) {

    let tabla = document.getElementById("tablaLibros");

    tabla.innerHTML = "";

    listaLibros.forEach(libro => {

        tabla.innerHTML += `
        <tr>
            <td>${libro.id}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.categoria}</td>
            <td>${libro.anio}</td>
            <td>${libro.estado}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarLibro(${libro.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarLibro(${libro.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });

}

function limpiarCampos(){

    document.getElementById("titulo").value="";
    document.getElementById("autor").value="";
    document.getElementById("categoria").value="";
    document.getElementById("anio").value="";

}