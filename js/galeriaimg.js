let imgCarrusel = document.querySelector("#carrusel-img");
let imgCarrusel1 = document.querySelector("#carrusel-img1");
let imgCarrusel2 = document.querySelector("#carrusel-img2");
let imgCarrusel3 = document.querySelector("#carrusel-img3");
let imgCarrusel4 = document.querySelector("#carrusel-img4");
let imgCarrusel5 = document.querySelector("#carrusel-img5");

// ---------------------
// CARRUSEL 0 - ÁFRICA
// ---------------------
const imagenes = [
  "img/1africatermito.jpg","img/2africalentinus.jpg","img/3africaganoderma.jpg",
];
let indice = 0;
if (imgCarrusel) {
  imgCarrusel.src = imagenes[indice];
  setInterval(() => {
    indice = (indice + 1) % imagenes.length;
    imgCarrusel.src = imagenes[indice];
  }, 5000);
}

// ---------------------
// CARRUSEL 1 - AMÉRICA
// ---------------------
const imagenes1 = [
  "img/1americaamenita.jpg","img/2americamorchella.jpg","img/3americaustilago.jpg"
];
let indice1 = 0;
if (imgCarrusel1) {
  imgCarrusel1.src = imagenes1[indice1];
  setInterval(() => {
    indice1 = (indice1 + 1) % imagenes1.length;
    imgCarrusel1.src = imagenes1[indice1];
  }, 5000);
}

// ---------------------
// CARRUSEL 2 - ANTÁRTIDA
// ---------------------
const imagenes2 = [
  "img/1antartidacryomyces.jpg","img/2antartidapseudogy.jpg","img/3antartidaphialophora.jpg"
];
let indice2 = 0;
if (imgCarrusel2) {
  imgCarrusel2.src = imagenes2[indice2];
  setInterval(() => {
    indice2 = (indice2 + 1) % imagenes2.length;
    imgCarrusel2.src = imagenes2[indice2]; // ← CORREGIDO
  }, 5000);
}

// ---------------------
// CARRUSEL 3 - ASIA
// ---------------------
const imagenes3 = [
  "img/1asiaganoderma.jpg","img/2asiamatsutake.jpg","img/3asiaophiocordycep.jpg"
];
let indice3 = 0;
if (imgCarrusel3) {
  imgCarrusel3.src = imagenes3[indice3];
  setInterval(() => {
    indice3 = (indice3 + 1) % imagenes3.length;
    imgCarrusel3.src = imagenes3[indice3];
  }, 5000);
}

// ---------------------
// CARRUSEL 4 - EUROPA
// ---------------------
const imagenes4 = [
  "img/1europatuber.jpg","img/2europaamanita.jpg","img/3europaboletus.jpg"
];
let indice4 = 0;
if (imgCarrusel4) {
  imgCarrusel4.src = imagenes4[indice4];
  setInterval(() => {
    indice4 = (indice4 + 1) % imagenes4.length;
    imgCarrusel4.src = imagenes4[indice4];
  }, 5000);
}

// ---------------------
// CARRUSEL 5 - OCEANÍA
// ---------------------
const imagenes5 = [
  "img/1oceaniaclathrus.jpg","img/2oceanialeratiomyces.jpg","img/3oceaniaaustropaxillus.jpg"
];
let indice5 = 0;
if (imgCarrusel5) {
  imgCarrusel5.src = imagenes5[indice5];
  setInterval(() => {
    indice5 = (indice5 + 1) % imagenes5.length;
    imgCarrusel5.src = imagenes5[indice5];
  }, 5000);
}

// ---------------------
// SONIDO AL PASAR EL MOUSE
// ---------------------
const hoverSound = document.getElementById("hover-sound");

document.querySelectorAll(".hover-sound").forEach(img => {
  img.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});
