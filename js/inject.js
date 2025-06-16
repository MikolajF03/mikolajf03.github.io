function loadComponent(targetId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Błąd ładowania ${filePath}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(targetId).innerHTML = data;
    })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "navbar.html");
  loadComponent("footer", "footer.html");
});