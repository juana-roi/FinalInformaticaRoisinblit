document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("change", () => {
    if (menuToggle.checked) {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });
});