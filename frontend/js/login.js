const API_LOGIN = "http://localhost:3000/api/login";

function iniciarSesion() {

    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    if (usuario === "" || password === "") {
        document.getElementById("mensaje").innerHTML = "Complete todos los campos";
        return;
    }

    grecaptcha.ready(() => {

        grecaptcha.execute("6LeeFkgtAAAAAKVwtO3GWvqHXySPQf4WbxoXlgiL", { action: "login" })
            .then(captcha => {

                fetch(API_LOGIN, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuario, password, captcha })
                })
                    .then(respuesta => {

                        if (!respuesta.ok) {
                            throw new Error("Credenciales incorrectas");
                        }

                        return respuesta.json();

                    })
                    .then(() => {

                        localStorage.setItem("sesion", "activa");

                        window.location.href = "index.html";

                    })
                    .catch(error => {

                        document.getElementById("mensaje").innerHTML = "Usuario o contraseña incorrectos";

                    });

            });

    });

}