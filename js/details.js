const params = new URLSearchParams(window.location.search);
const repoName = params.get('name');
const languageMap = JSON.parse(localStorage.getItem('languageMap') || '{}');

function showError(message) {
  document.getElementById('project-details').innerHTML = `<p style="color:white;">${message}</p>`;
}

if (!repoName) {
  showError('Brak nazwy repozytorium.');
} else {
  fetch(`https://api.github.com/repos/microsoft/${repoName}`)
    .then(res => {
      if (!res.ok) throw new Error("Nie znaleziono projektu.");
      return res.json();
    })
    .then(repo => {
      const language = repo.language || languageMap[repo.id] || 'Nieznany';
      document.getElementById('project-details').innerHTML = `
        <div class="project-header">
          <h1 class="project-title">${repo.name}</h1>
          <p class="project-tags"><strong>Język programowania:</strong> ${language}</p>
        </div>

        <div class="project-panel">
          <div class="project-description">
            <h3>Opis:</h3>
            <p>${repo.description ? repo.description.replace(/\n/g, '<br>') : 'Brak opisu'}</p>

            <div class="buttons">
              <a href="${repo.html_url}" class="btn" target="_blank" rel="noopener noreferrer">Kod źródłowy</a>
              <a href="${repo.homepage || repo.html_url}" class="btn" target="_blank" rel="noopener noreferrer">Zobacz online</a>
            </div>
          </div>

          <div class="project-media">
            <h3>Prezentacja graficzna / film</h3>
            <div class="media-placeholder"></div>
            <div class="media-placeholder"></div>
          </div>
        </div>

        <p class="last-updated">Ostatnia aktualizacja projektu: ${new Date(repo.updated_at).toLocaleDateString('pl-PL')}</p>
      `;
    })
    .catch(err => showError("Wystąpił błąd: " + err.message));
}
