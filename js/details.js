const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const languageMap = JSON.parse(localStorage.getItem('languageMap') || '{}');

function showError(message) {
  document.getElementById('project-details').innerHTML = `<p style="color:white;">${message}</p>`;
}

if (!projectId) {
  showError('Brak ID projektu.');
} else {
  fetch(`https://jsonplaceholder.typicode.com/posts/${projectId}`)
    .then(res => {
      if (!res.ok) throw new Error("Nie znaleziono projektu.");
      return res.json();
    })
    .then(project => {
      const language = languageMap[project.id] || 'Nieznany';
      document.getElementById('project-details').innerHTML = `
  <div class="project-header">
    <h1 class="project-title">${project.title}</h1>
    <p class="project-tags"><strong>Język programowania:</strong> ${language}</p>
  </div>

  <div class="project-panel">
    <div class="project-description">
      <h3>Opis:</h3>
      <p>${project.body.replace(/\n/g, '<br>')}</p>

      <div class="buttons">
        <a href="#" class="btn">Kod źródłowy</a>
        <a href="#" class="btn">Zobacz online</a>
      </div>
    </div>

    <div class="project-media">
      <h3>Prezentacja graficzna/ film</h3>
      <div class="media-placeholder"></div>
      <div class="media-placeholder"></div>
    </div>
  </div>

  <p class="last-updated">Ostatnia aktualizacja projektu: 12.04.2025</p>
`;
    })
    .catch(err => showError("Wystąpił błąd: " + err.message));
}
