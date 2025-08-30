const themeToggler = document.getElementById("themeToggle");
const html = document.querySelector("html");

let themeFromeLocal = localStorage.getItem("theme");

if (themeFromeLocal) {
  html.dataset.theme = themeFromeLocal;
  themeToggler.checked = themeFromeLocal === "dark";
}

themeToggler.addEventListener("change", () => {
  html.dataset.theme = html.dataset.theme == "light" ? "dark" : "light";
  localStorage.setItem("theme", html.dataset.theme);
});
