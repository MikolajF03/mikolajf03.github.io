const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const languageMap = JSON.parse(localStorage.getItem('languageMap') || '{}');

const languageLogos = {
  'JavaScript': 'https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png',
  'Python': 'https://raw.githubusercontent.com/github/explore/main/topics/python/python.png',
  'Java': 'https://raw.githubusercontent.com/github/explore/main/topics/java/java.png',
  'TypeScript': 'https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png',
  'C#': 'https://raw.githubusercontent.com/github/explore/main/topics/csharp/csharp.png',
  'C++': 'https://raw.githubusercontent.com/github/explore/main/topics/cpp/cpp.png',
  'Go': 'https://raw.githubusercontent.com/github/explore/main/topics/go/go.png',
  'Ruby': 'https://raw.githubusercontent.com/github/explore/main/topics/ruby/ruby.png',
  'PHP': 'https://raw.githubusercontent.com/github/explore/main/topics/php/php.png',
  'Rust': 'https://raw.githubusercontent.com/github/explore/main/topics/rust/rust.png',
  'Brak języka': 'https://via.placeholder.com/100x100?text=Brak',
};

function showError(message) {
  document.getElementById('project-details').innerHTML = `<p style="color:white;">${message}</p>`;
}

if (!projectId) {
  showError('Brak ID projektu.');
} else {
  fetch(`https://api.github.com/orgs/microsoft/repos?per_page=100`)
    .then(res => {
      if (!res.ok) throw new Error("Nie udało się pobrać danych z GitHub.");
      return res.json();
    })
    .then(repos => {
      const repo = repos.find(r => r.id.toString() === projectId);
      if (!repo) throw new Error("Nie znaleziono projektu.");

      const language = languageMap[repo.id] || repo.language || 'Brak języka';
      const logoUrl = languageLogos[language] || 'https://via.placeholder.com/100x100?text=Unknown';

      document.getElementById('project-details').innerHTML = `
        <div class="project-header">
          <h1 class="project-title">${repo.name}</h1>
          <p class="project-tags"><strong>Język programowania:</strong> ${language}</p>
        </div>

        <div class="project-panel">
          <div class="project-description">
            <h3>Opis:</h3>
            <p>${repo.description || 'Brak opisu.'}</p>

            <div class="buttons">
              <a href="${repo.html_url}" class="btn" target="_blank">Kod źródłowy</a>
              ${repo.homepage ? `<a href="${repo.homepage}" class="btn" target="_blank">Zobacz online</a>` : ''}
            </div>
          </div>

          <div class="project-media">
            <h3>Technologia projektu</h3>
            <img src="${logoUrl}" alt="${language}" class="tech-logo" style="max-width: 120px; margin-bottom: 1rem;" />
            <p>Logo języka: ${language}</p>
          </div>
        </div>

        <p class="last-updated">Ostatnia aktualizacja projektu: ${new Date(repo.updated_at).toLocaleDateString('pl-PL')}</p>
      `;
    })
    .catch(err => showError("Wystąpił błąd: " + err.message));
}
