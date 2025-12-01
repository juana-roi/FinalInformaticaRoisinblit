/* juego.js
   -------------------------
   Juego del Mundo Fungi
   -------------------------
   ... (comentarios originales)
*/

/* -------------------------
   1) SELECTORES del DOM
   ------------------------- */
const pantallaInicial = document.querySelector("#pantalla-inicial");
const pantallaPreguntas = document.querySelector("#pantalla-preguntas");
const pantallaResultados = document.querySelector("#pantalla-resultados");

// SONIDO DE BOTÓN
const sonidoBoton = new Audio("../sonido/fungibutton.mp3");

const botonesDificultad = Array.from(document.querySelectorAll(".btn-dificultad"));
const textoPregunta = document.querySelector("#texto-pregunta");
const timerDisplay = document.querySelector("#timer");
const opcionesContainer = document.querySelector("#pantalla-preguntas .flex");
const puntajeFinalEl = document.querySelector("#puntaje-final");
const listaResultadosEl = document.querySelector("#lista-resultados");

/* -------------------------
   2) ESTADO GLOBAL
   ------------------------- */
let dificultadActual = null;
let preguntasPartida = [];
let indicePregunta = 0;
let puntaje = 0;
let historialRespuestas = [];
let intervaloTiempo = null;
let tiempoRestante = 0;
let puedeResponder = true;

/* -------------------------
   3) CONFIG
   ------------------------- */
const CONFIG = { facil: 10, medio: 12, dificil: 12 };
const PUNTOS = { facil: 1, medio: 2, dificil: 3 };
const TIEMPO_POR_DIFICULTAD = { facil: 15, medio: 10, dificil: 10 };

/* -------------------------
   4) BANCO DE PREGUNTAS
   ------------------------- */
const BANCO_PREGUNTAS = [
  /* ------------------ PREGUNTAS FÁCIL (V/F) ------------------ */
  { tipo: "tf", pregunta: "Los hongos pertenecen al reino vegetal.", correcta: false, fuente: "global" },
  { tipo: "tf", pregunta: "Las micorrizas ayudan a los árboles a absorber más nutrientes.", correcta: true, fuente: "global" },
  { tipo: "tf", pregunta: "Los líquenes son raramente encontrados en la Antártida.", correcta: false, fuente: "antartida" },
  { tipo: "tf", pregunta: "El reishi (Ganoderma lucidum) es un hongo usado en la medicina tradicional asiática.", correcta: true, fuente: "asia" },
  { tipo: "tf", pregunta: "El kril es esencial para la cadena alimentaria alrededor de la Antártida.", correcta: true, fuente: "antartida" },
  { tipo: "tf", pregunta: "Los hongos necesitan siempre luz solar directa para crecer.", correcta: false, fuente: "global" },
  { tipo: "tf", pregunta: "Termitomyces crece en asociación con termitas en algunas regiones de África.", correcta: true, fuente: "africa" },
  { tipo: "tf", pregunta: "La trufa negra (Tuber melanosporum) crece principalmente en bosques mediterráneos de Europa.", correcta: true, fuente: "europa" },
  { tipo: "tf", pregunta: "Australia no tiene hongos endémicos interesantes.", correcta: false, fuente: "oceania" },
  { tipo: "tf", pregunta: "Algunos hongos son comestibles y otros venenosos; no todos los hongos son seguros para comer.", correcta: true, fuente: "global" },
  { tipo: "tf", pregunta: "El huitlacoche (Ustilago maydis) es considerado un manjar en México.", correcta: true, fuente: "america" },
  { tipo: "tf", pregunta: "Las morchellas aparecen con mayor frecuencia después de incendios forestales.", correcta: true, fuente: "america" },

  /* ------------------ PREGUNTAS MEDIO (MC 3 opciones) ------------------ */
  { tipo: "mc", pregunta: "¿En qué ecosistema se encuentra comúnmente Termitomyces?", opciones: ["Bosques tropicales y montículos de termitas", "Tundra ártica", "Desierto"], correcta: "Bosques tropicales y montículos de termitas", fuente: "africa" },
  { tipo: "mc", pregunta: "¿Cuál de estos hongos es típico de bosques templados europeos y apreciado en cocina?", opciones: ["Boletus edulis", "Ganoderma lucidum", "Clathrus archeri"], correcta: "Boletus edulis", fuente: "europa" },
  { tipo: "mc", pregunta: "¿Qué hongo es famoso por parasitar insectos en zonas montañosas de Asia?", opciones: ["Cordyceps sinensis", "Amanita muscaria", "Agaricus bisporus"], correcta: "Cordyceps sinensis", fuente: "asia" },
  { tipo: "mc", pregunta: "¿Qué papel cumplen los hongos saprótrofos en un bosque?", opciones: ["Descomponen materia orgánica muerta", "Aumentan la salinidad del suelo", "Producen clorofila"], correcta: "Descomponen materia orgánica muerta", fuente: "global" },
  { tipo: "mc", pregunta: "¿Cuál es una característica típica de hongos en Oceanía (Australia/NZ)?", opciones: ["Alta endemia y especies únicas como canguros fúngicos", "Especies aisladas y evolución única", "No hay hongos en Oceanía"], correcta: "Especies aisladas y evolución única", fuente: "oceania" },
  { tipo: "mc", pregunta: "¿Dónde crece el matsutake (Tricholoma matsutake)?", opciones: ["Bosques de pinos viejos en Asia", "Praderas de Europa", "Desiertos de África"], correcta: "Bosques de pinos viejos en Asia", fuente: "asia" },
  { tipo: "mc", pregunta: "¿Qué hongo agrícola es consumido como delicatesen en México?", opciones: ["Ustilago maydis (huitlacoche)", "Coprinus comatus", "Phallus impudicus"], correcta: "Ustilago maydis (huitlacoche)", fuente: "america" },
  { tipo: "mc", pregunta: "En Sudamérica, ¿qué papel ecológico suelen cumplir muchos hongos de madera?", opciones: ["Descomponedores de madera y recicladores de nutrientes", "Productores de oxígeno en masa", "Causantes de sequías"], correcta: "Descomponedores de madera y recicladores de nutrientes", fuente: "america" },
  { tipo: "mc", pregunta: "¿Qué tipo de hongos se encuentran en la Antártida principalmente?", opciones: ["Microhongos extremófilos y líquenes", "Grandes setas comestibles", "Hongos tropicales"], correcta: "Microhongos extremófilos y líquenes", fuente: "antartida" },
  { tipo: "mc", pregunta: "¿Qué hongo es conocido como 'hongo artista' (superficie marcable)?", opciones: ["Ganoderma applanatum", "Morchella esculenta", "Amanita phalloides"], correcta: "Ganoderma applanatum", fuente: "africa/europa" },
  { tipo: "mc", pregunta: "Los micelios de hongos ayudan a formar... ¿qué componente del suelo esencial?", opciones: ["Materia orgánica y estructura de suelo (horizonte orgánico)", "Sal marina", "Arena compacta"], correcta: "Materia orgánica y estructura de suelo (horizonte orgánico)", fuente: "global" },
  { tipo: "mc", pregunta: "En Asia, ¿qué uso tradicional se le da al reishi?", opciones: ["Como tónico medicinal", "Como tinte textil", "Como superalimento para insectos"], correcta: "Como tónico medicinal", fuente: "asia" },

  /* ------------------ PREGUNTAS DIFÍCIL (MC 4 opciones) ------------------ */
  { tipo: "mc", pregunta: "¿Cuál de estas especies forma una simbiosis tradicional con termitas para cultivar su 'pan de hongo'?", opciones: ["Termitomyces titanicus", "Amanita muscaria", "Boletus edulis", "Pleurotus ostreatus"], correcta: "Termitomyces titanicus", fuente: "africa" },
  { tipo: "mc", pregunta: "¿Qué característica distingue al hongo Cordyceps sinensis?", opciones: ["Parasitismo sobre larvas subterráneas y hábitats alpinos", "Crece sobre madera de pino en llanuras", "Es un hongo acuático", "Produce trufas comestibles"], correcta: "Parasitismo sobre larvas subterráneas y hábitats alpinos", fuente: "asia" },
  { tipo: "mc", pregunta: "¿Cuál es la principal base alimentaria que sostiene a ballenas, pingüinos y focas en la Antártida?", opciones: ["Krill", "Plancton vegetal grande", "Gusanos marinos gigantes", "Caracoles"], correcta: "Krill", fuente: "antartida" },
  { tipo: "mc", pregunta: "¿Qué hongo europeo es conocido por su valor culinario en la cocina mediterránea y templada?", opciones: ["Boletus edulis", "Ophiocordyceps", "Cordyceps sinensis", "Clathrus archeri"], correcta: "Boletus edulis", fuente: "europa" },
  { tipo: "mc", pregunta: "¿Qué adaptaciones presentan hongos que viven en desiertos o zonas muy secas?", opciones: ["Esporas resistentes, crecimiento estacional y dormancia", "Altos tallos fotosintéticos", "Raíces profundas como plantas", "Hojas grandes"], correcta: "Esporas resistentes, crecimiento estacional y dormancia", fuente: "global" },
  { tipo: "mc", pregunta: "¿Cuál de estos hongos australianos es notable por su forma rara (apariencia tubular o tentacular)?", opciones: ["Clathrus archeri", "Amanita muscaria", "Lentinus sajor-caju", "Tuber melanosporum"], correcta: "Clathrus archeri", fuente: "oceania" },
  { tipo: "mc", pregunta: "¿Qué factor humano amenaza más a hongos raros como el matsutake?", opciones: ["Pérdida de hábitat y cambios en uso del suelo", "La pesca comercial", "La sobreexplotación de trufas", "La presencia de aves migratorias"], correcta: "Pérdida de hábitat y cambios en uso del suelo", fuente: "asia/europa" },
  { tipo: "mc", pregunta: "¿Qué hongo mexicano se usa como ingrediente tradicional y además estudia su valor nutricional?", opciones: ["Ustilago maydis (huitlacoche)", "Agaricus bisporus", "Ganoderma lucidum", "Pleurotus ostreatus"], correcta: "Ustilago maydis (huitlacoche)", fuente: "america" },
  { tipo: "mc", pregunta: "En bosques tropicales africanos, ¿qué función tienen los hongos micorrícicos y saprótrofos combinados?", opciones: ["Facilitan reciclaje de nutrientes y sostienen plantas jóvenes", "Incrementan la salinidad del suelo", "Reducen la biodiversidad", "Producen grandes cantidades de oxígeno"], correcta: "Facilitan reciclaje de nutrientes y sostienen plantas jóvenes", fuente: "africa" },
  { tipo: "mc", pregunta: "¿Por qué muchos hongos antárticos se estudian en astrobiología?", opciones: ["Porque sobreviven a frío extremo, radiación y aislamiento, similares a condiciones extraterrestres", "Porque vuelan al espacio", "Porque producen combustibles fósiles", "Porque son visibles desde satélites"], correcta: "Porque sobreviven a frío extremo, radiación y aislamiento, similares a condiciones extraterrestres", fuente: "antartida" },
  { tipo: "mc", pregunta: "¿Qué hongo se ha descrito como 'artista' por su superficie que permite dibujar?", opciones: ["Ganoderma applanatum", "Morchella esculenta", "Amanita muscaria", "Cordyceps sinensis"], correcta: "Ganoderma applanatum", fuente: "europa/africa" },
  { tipo: "mc", pregunta: "¿Qué característica hace valioso al matsutake?", opciones: ["Aroma único, relación micorrícica con pinos viejos y rareza", "Su color brillante", "Su uso en construcción", "Su fácil cultivo masivo"], correcta: "Aroma único, relación micorrícica con pinos viejos y rareza", fuente: "asia" }
];

/* -------------------------
   5) UTILIDADES
   ------------------------- */
function mezclaArray(arr) {
  const copia = arr.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function tomarPreguntasParaDificultad(dificultad) {
  const tipoNecesario = (dificultad === "facil") ? "tf" : "mc";
  const filtradas = BANCO_PREGUNTAS.filter(q => q.tipo === tipoNecesario);
  return mezclaArray(filtradas).slice(0, CONFIG[dificultad]);
}

/* -------------------------
   6) INICIAR PARTIDA
   ------------------------- */
function iniciarPartida(dificultad) {
  dificultadActual = dificultad;
  preguntasPartida = tomarPreguntasParaDificultad(dificultad);
  indicePregunta = 0;
  puntaje = 0;
  historialRespuestas = [];

  pantallaInicial.classList.add("hidden");
  pantallaResultados.classList.add("hidden");
  pantallaPreguntas.classList.remove("hidden");

  mostrarPregunta();
}

/* -------------------------
   7) MOSTRAR PREGUNTA
   ------------------------- */
function limpiarOpciones() {
  if (opcionesContainer) opcionesContainer.innerHTML = "";
}

/* 🎧 FUNCIÓN MODIFICADA → agrega sonido en cada botón */
function crearBotonOpcion(texto, callback, claseExtra = "") {
  const btn = document.createElement("button");
  btn.className = `w-full py-4 rounded-xl text-2xl font-bold ${claseExtra}`;
  btn.textContent = texto;

  btn.addEventListener("click", () => {
    if (!puedeResponder) return;

    sonidoBoton.currentTime = 0;
    sonidoBoton.play();   // 🔊 SONIDO AL HACER CLICK

    puedeResponder = false;
    desactivarTodasOpciones();
    callback(texto);
  });

  return btn;
}

/* ------------------------- */
function desactivarTodasOpciones() {
  opcionesContainer.querySelectorAll("button")
    .forEach(b => b.disabled = true);
}

function mostrarPregunta() {
  puedeResponder = true;

  if (indicePregunta >= preguntasPartida.length) return mostrarResultados();

  const q = preguntasPartida[indicePregunta];
  textoPregunta.textContent = q.pregunta;

  limpiarOpciones();

  if (q.tipo === "tf") {
    const btnV = crearBotonOpcion("Verdadero", () => manejarRespuestaTF(q, true),
      "bg-green-700 text-white hover:bg-green-800");
    const btnF = crearBotonOpcion("Falso", () => manejarRespuestaTF(q, false),
      "bg-red-700 text-white hover:bg-red-800");

    opcionesContainer.appendChild(btnV);
    opcionesContainer.appendChild(btnF);

  } else if (q.tipo === "mc") {
    mezclaArray(q.opciones).forEach(op => {
      const btn = crearBotonOpcion(op, () => manejarRespuestaMC(q, op),
        "bg-green-700 text-white hover:bg-green-800");
      opcionesContainer.appendChild(btn);
    });
  }

  iniciarTemporizadorSegunDificultad(dificultadActual);
}

/* -------------------------
   8) TEMPORIZADOR
   ------------------------- */
function iniciarTemporizadorSegunDificultad(dif) {
  if (intervaloTiempo) clearInterval(intervaloTiempo);

  tiempoRestante = TIEMPO_POR_DIFICULTAD[dif];
  actualizarTimerVisual();

  intervaloTiempo = setInterval(() => {
    tiempoRestante--;
    actualizarTimerVisual();

    if (tiempoRestante <= 0) {
      clearInterval(intervaloTiempo);
      intervaloTiempo = null;
      puedeResponder = false;
      desactivarTodasOpciones();

      registrarRespuesta(null, false, "tiempo");

      setTimeout(() => {
        indicePregunta++;
        mostrarPregunta();
      }, 600);
    }

  }, 1000);
}

function actualizarTimerVisual() {
  timerDisplay.textContent = String(tiempoRestante).padStart(2, "0");
}

/* -------------------------
   9) RESPUESTAS
   ------------------------- */
function manejarRespuestaTF(q, boolResp) {
  if (intervaloTiempo) clearInterval(intervaloTiempo);

  const acerto = (q.correcta === boolResp);
  if (acerto) puntaje += PUNTOS[dificultadActual];

  registrarRespuesta(boolResp ? "Verdadero" : "Falso", acerto);

  setTimeout(() => {
    indicePregunta++;
    mostrarPregunta();
  }, 500);
}

function manejarRespuestaMC(q, texto) {
  if (intervaloTiempo) clearInterval(intervaloTiempo);

  const acerto = (texto === q.correcta);
  if (acerto) puntaje += PUNTOS[dificultadActual];

  registrarRespuesta(texto, acerto);

  setTimeout(() => {
    indicePregunta++;
    mostrarPregunta();
  }, 500);
}

function registrarRespuesta(resp, acerto, motivo = "") {
  const pregunta = preguntasPartida[indicePregunta];
  historialRespuestas.push({
    pregunta: pregunta.pregunta,
    respondio: resp,
    acerto: acerto,
    tipo: pregunta.tipo,
    motivo: motivo
  });
}

/* -------------------------
   10) RESULTADOS
   ------------------------- */
function mostrarResultados() {
  if (intervaloTiempo) clearInterval(intervaloTiempo);

  pantallaPreguntas.classList.add("hidden");
  pantallaResultados.classList.remove("hidden");

  puntajeFinalEl.textContent = `Puntaje: ${puntaje} puntos`;
  listaResultadosEl.innerHTML = "";

  historialRespuestas.forEach((item, i) => {
    const box = document.createElement("div");
    box.className = "p-2 rounded border-l-4";

    if (item.acerto) {
      box.classList.add("border-green-600", "bg-green-50");
      box.innerHTML =
        `<strong>✅ Pregunta ${i + 1}:</strong> ${escapeHtml(item.pregunta)}<br><em>Acertaste</em>`;
    } else {
      box.classList.add("border-red-600", "bg-red-50");
      const motivo = item.motivo === "tiempo" ? " (sin responder — tiempo agotado)" : "";
      box.innerHTML =
        `<strong>❌ Pregunta ${i + 1}:</strong> ${escapeHtml(item.pregunta)}<br><em>Fallaste${motivo}</em>`;
    }

    listaResultadosEl.appendChild(box);
  });
}

/* -------------------------
   11) EVENTOS
   ------------------------- */

// 🎧 SONIDO EN BOTONES DE DIFICULTAD
function setupEventListeners() {
  botonesDificultad.forEach(btn => {
    btn.addEventListener("click", () => {
      sonidoBoton.currentTime = 0;
      sonidoBoton.play();   // 🔊 SONIDO
      const dif = btn.getAttribute("data-dificultad");
      if (!["facil", "medio", "dificil"].includes(dif)) return;
      iniciarPartida(dif);
    });
  });
}

/* -------------------------
   12) AUXILIARES
   ------------------------- */
function escapeHtml(s) {
  return s ? s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") : "";
}

/* -------------------------
   13) ARRANQUE
   ------------------------- */
setupEventListeners();
