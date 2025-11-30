document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Validar Gmail
    if (!email.endsWith("@gmail.com")) {
        alert("El correo debe ser una dirección Gmail.");
        return;
    }

    const params = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    emailjs.send("service_4744zc6", "template_kxfslzw", params)
        .then(() => {
            alert("Mensaje enviado correctamente ");
            document.getElementById("contactForm").reset();
        })
        .catch(() => {
            alert("Ocurrió un error al enviar el mensaje.");
        });
});