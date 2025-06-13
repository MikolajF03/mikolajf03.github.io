const params = new URLSearchParams(window.location.search);
const projectName = params.get('name');
const languageMap = JSON.parse(localStorage.getItem('languageMap') || '{}');

const languageLogos = {
  'JavaScript': 'https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png',
  'Python': 'https://raw.githubusercontent.com/github/explore/main/topics/python/python.png',
  'Java': 'https://raw.githubusercontent.com/github/explore/main/topics/java/java.png',
  'TypeScript': 'https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png',
  'C#': 'https://raw.githubusercontent.com/github/explore/main/topics/csharp/csharp.png',
  'C++': 'https://raw.githubusercontent.com/github/explore/main/topics/cpp/cpp.png',
  'C': 'https://raw.githubusercontent.com/abrahamcalf/programming-languages-logos/master/src/c/c_48x48.png',
  'Go': 'https://raw.githubusercontent.com/github/explore/main/topics/go/go.png',
  'Ruby': 'https://raw.githubusercontent.com/github/explore/main/topics/ruby/ruby.png',
  'PHP': 'https://raw.githubusercontent.com/github/explore/main/topics/php/php.png',
  'Swift': 'https://raw.githubusercontent.com/github/explore/main/topics/swift/swift.png',
  'Kotlin': 'https://raw.githubusercontent.com/github/explore/main/topics/kotlin/kotlin.png',
  'Rust': 'https://raw.githubusercontent.com/github/explore/main/topics/rust/rust.png',
  'Shell': 'https://raw.githubusercontent.com/github/explore/main/topics/shell/shell.png',
  'Objective-C': 'https://raw.githubusercontent.com/github/explore/main/topics/objective-c/objective-c.png',
  'Scala': 'https://raw.githubusercontent.com/github/explore/main/topics/scala/scala.png',
  'Brak języka': 'https://via.placeholder.com/100x100?text=Brak',
};

function showError(message) {
  document.getElementById('project-details').innerHTML = `<p style="color:white;">${message}</p>`;
}

if (!projectName) {
  showError('Brak nazwy projektu.');
} else {
  fetch(`https://api.github.com/orgs/microsoft/repos?per_page=100`)
    .then(res => {
      if (!res.ok) throw new Error("Nie udało się pobrać danych z GitHub.");
      return res.json();
    })
    .then(async repos => {
      const repo = repos.find(r => r.name.toLowerCase() === projectName.toLowerCase());
      if (!repo) throw new Error("Nie znaleziono projektu o nazwie " + projectName);

      const language = languageMap[repo.id] || repo.language || 'Brak języka';
      const logoUrl = languageLogos[language] || 'https://via.placeholder.com/100x100?text=Unknown';

      // Pobierz tematy (topics)
      const topicRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/topics`, {
        headers: { Accept: 'application/vnd.github.mercy-preview+json' }
      });

      const topicData = await topicRes.json();
      const topics = topicData.names || [];

      const tagHTML = topics.length
        ? topics.map(tag => `<span class="tag">${tag}</span>`).join(' ')
        : '<span class="tag">Brak tagów</span>';

      document.getElementById('project-details').innerHTML = `
        <div class="project-header">
          <h1 class="project-title">${repo.name}</h1>
          <div class="project-tags">${tagHTML}</div>
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
