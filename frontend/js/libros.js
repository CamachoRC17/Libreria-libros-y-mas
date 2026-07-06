const API_TITULOS = "http://localhost:3000/api/titulos";
const API_EJEMPLARES = "http://localhost:3000/api/ejemplares";

let titulos = [];
let idTituloActual = null;

mostrarTitulos();

function agregarTitulo() {

    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let categoria = document.getElementById("categoria").value;
    let anio = document.getElementById("anio").value;
    let isbn = document.getElementById("isbn").value;

    if (titulo === "" || autor === "" || categoria === "" || anio === "") {
        mostrarAlerta("Complete todos los campos obligatorios");
        return;
    }

    if (anio.length !== 4 || anio < 1000 || anio > 2100) {
        mostrarAlerta("El año debe tener 4 dígitos y estar entre 1000 y 2100");
        return;
    }

    fetch(API_TITULOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, categoria, anio, isbn })
    })
        .then(respuesta => respuesta.json())
        .then(() => {
            mostrarTitulos();
            limpiarCampos();
            mostrarAlerta("Título creado. Ahora agrégale al menos un ejemplar desde el botón 'Ejemplares'.");
        })
        .catch(error => {
            console.log("Error al crear título:", error);
        });

}

function mostrarTitulos() {

    fetch(API_TITULOS)
        .then(respuesta => respuesta.json())
        .then(datos => {

            titulos = datos;

            renderizarTabla(titulos);

        })
        .catch(error => {
            console.log("Error al obtener títulos:", error);
        });

}

function renderizarTabla(listaTitulos) {

    let tabla = document.getElementById("tablaLibros");

    tabla.innerHTML = "";

    listaTitulos.forEach(t => {

        tabla.innerHTML += `
        <tr>
            <td data-label="ID">${t.id}</td>
            <td data-label="Título">${t.titulo}</td>
            <td data-label="Autor">${t.autor}</td>
            <td data-label="Categoría">${t.categoria}</td>
            <td data-label="Año">${t.anio}</td>
            <td data-label="Ejemplares">${t.disponibles} de ${t.totalEjemplares} disponibles</td>
            <td data-label="Acciones">
                <button class="btn btn-editar btn-sm" onclick="editarTitulo(${t.id})">Editar</button>
                <button class="btn btn-agregar btn-sm" onclick="abrirModalEjemplares(${t.id})">Ejemplares</button>
                <button class="btn btn-eliminar btn-sm" onclick="eliminarTitulo(${t.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });

}

function editarTitulo(id) {

    let t = titulos.find(x => x.id == id);

    document.getElementById("editId").value = t.id;
    document.getElementById("editTitulo").value = t.titulo;
    document.getElementById("editAutor").value = t.autor;
    document.getElementById("editCategoria").value = t.categoria;
    document.getElementById("editAnio").value = t.anio;
    document.getElementById("editIsbn").value = t.isbn || "";

    let modal = new bootstrap.Modal(document.getElementById("modalEditarLibro"));

    modal.show();

}

function guardarEdicionTitulo() {

    let id = document.getElementById("editId").value;
    let titulo = document.getElementById("editTitulo").value;
    let autor = document.getElementById("editAutor").value;
    let categoria = document.getElementById("editCategoria").value;
    let anio = document.getElementById("editAnio").value;
    let isbn = document.getElementById("editIsbn").value;

    if (titulo === "" || autor === "" || categoria === "" || anio === "") {
        mostrarAlerta("Complete todos los campos obligatorios");
        return;
    }

    if (anio.length !== 4 || anio < 1000 || anio > 2100) {
        mostrarAlerta("El año debe tener 4 dígitos y estar entre 1000 y 2100");
        return;
    }

    fetch(`${API_TITULOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, categoria, anio, isbn })
    })
        .then(respuesta => respuesta.json())
        .then(() => {

            mostrarTitulos();

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarLibro"));

            modal.hide();

        })
        .catch(error => {
            console.log("Error al actualizar título:", error);
        });

}

let idTituloAEliminar = null;

function eliminarTitulo(id) {

    idTituloAEliminar = id;

    let modal = new bootstrap.Modal(document.getElementById("modalConfirmarEliminarLibro"));

    modal.show();

}

function confirmarEliminarTitulo() {

    fetch(`${API_TITULOS}/${idTituloAEliminar}`, {
        method: "DELETE"
    })
        .then(respuesta => respuesta.json().then(datos => ({ ok: respuesta.ok, datos })))
        .then(({ ok, datos }) => {

            let modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmarEliminarLibro"));
            modal.hide();

            if (!ok) {
                mostrarAlerta(datos.mensaje || "No se pudo eliminar el título");
                return;
            }

            mostrarTitulos();

        })
        .catch(error => {
            console.log("Error al eliminar título:", error);
        });

}

function abrirModalEjemplares(idTitulo) {

    idTituloActual = idTitulo;

    let t = titulos.find(x => x.id == idTitulo);

    document.getElementById("nombreTituloEjemplares").innerText = t.titulo;
    document.getElementById("nuevoCodigoEjemplar").value = "";

    cargarEjemplaresModal();

    let modal = new bootstrap.Modal(document.getElementById("modalEjemplares"));

    modal.show();

}

function cargarEjemplaresModal() {

    fetch(`${API_EJEMPLARES}/titulo/${idTituloActual}`)
        .then(respuesta => respuesta.json())
        .then(ejemplares => {

            let tabla = document.getElementById("tablaEjemplaresModal");

            tabla.innerHTML = "";

            ejemplares.forEach(ej => {

                let botonEliminar = ej.estado === "Disponible"
                    ? `<button class="btn btn-eliminar btn-sm" onclick="eliminarEjemplarModal(${ej.id})">Eliminar</button>`
                    : `<span class="text-muted">—</span>`;

                tabla.innerHTML += `
                <tr>
                    <td data-label="Código">${ej.codigo}</td>
                    <td data-label="Estado">${ej.estado}</td>
                    <td data-label="Acción">${botonEliminar}</td>
                </tr>
                `;

            });

        })
        .catch(error => {
            console.log("Error al obtener ejemplares:", error);
        });

}

function agregarEjemplarModal() {

    let codigo = document.getElementById("nuevoCodigoEjemplar").value;

    if (codigo === "") {
        mostrarAlerta("Escriba un código para el ejemplar");
        return;
    }

    fetch(API_EJEMPLARES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idTitulo: idTituloActual, codigo })
    })
        .then(respuesta => respuesta.json().then(datos => ({ ok: respuesta.ok, datos })))
        .then(({ ok, datos }) => {

            if (!ok) {

                if (datos.code === "ER_DUP_ENTRY") {
                    mostrarAlerta("Ese código ya existe en otro ejemplar. Use uno distinto.");
                } else {
                    mostrarAlerta("No se pudo crear el ejemplar");
                }

                return;
            }

            document.getElementById("nuevoCodigoEjemplar").value = "";
            cargarEjemplaresModal();
            mostrarTitulos();

        })
        .catch(error => {
            console.log("Error al crear ejemplar:", error);
        });

}

function eliminarEjemplarModal(id) {

    fetch(`${API_EJEMPLARES}/${id}`, {
        method: "DELETE"
    })
        .then(respuesta => respuesta.json().then(datos => ({ ok: respuesta.ok, datos })))
        .then(({ ok, datos }) => {

            if (!ok) {
                mostrarAlerta(datos.mensaje || "No se pudo eliminar el ejemplar");
                return;
            }

            cargarEjemplaresModal();
            mostrarTitulos();

        })
        .catch(error => {
            console.log("Error al eliminar ejemplar:", error);
        });

}

function buscarTitulo() {

    let texto = document.getElementById("buscar").value.toLowerCase();

    let filtrados = titulos.filter(t =>
        t.titulo.toLowerCase().includes(texto)
    );

    renderizarTabla(filtrados);

}

function limpiarCampos() {

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("isbn").value = "";

}