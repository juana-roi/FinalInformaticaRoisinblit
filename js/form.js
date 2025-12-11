// Inicializar EmailJS
(function() {
    emailjs.init("UZ2h8lJRq6hRd5nGg"); 
})();

// Crear la app Vue
const app = Vue.createApp({
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: ""
            }
        };
    },

    methods: {
        enviarFormulario() {
            // Enviar los datos con EmailJS
            emailjs.send("service_4744zc6", "template_kxfslzw", {
                user_name: this.form.name,
                user_email: this.form.email,
                message: this.form.message
            })
            .then(() => {
                alert("Mensaje enviado correctamente!");
                
                // Limpiar formulario
                this.form.name = "";
                this.form.email = "";
                this.form.message = "";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Hubo un error al enviar el mensaje.");
            });
        }
    }
});

// Montar Vue
app.mount("#app");
