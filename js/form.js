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

    validarYEnviar() {

      // 1️⃣ Validar campos obligatorios
      if (
        !this.form.name ||
        !this.form.email ||
        !this.form.message
      ) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      // 2️⃣ Validar que sea Gmail
      if (!this.form.email.endsWith("@gmail.com")) {
        alert("El correo debe ser una dirección Gmail.");
        return;
      }

      // 3️⃣ Enviar a Formspree
      const formulario = document.getElementById("miFormulario");
      formulario.submit();

      // 4️⃣ Limpiar campos (UX)
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";

      alert("Mensaje enviado correctamente ✅");
    }

  }

});

app.mount("#app");
