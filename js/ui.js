let currentPage = 1;

function truncate(text, maxLength = 50) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function renderProjects() {
  const isDesktop = window.innerWidth >= 1024;
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const selectedLanguage = document.getElementById('filter').value;
  const sortOption = document.getElementById('sort').value;

  let filtered = allProjects.filter(repo => {
    const title = repo.name.toLowerCase();
    const lang = languageMap[repo.id];
    return title.includes(searchQuery) && (!selectedLanguage || lang === selectedLanguage);
  });

  if (sortOption === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  const perPage = 10;
  const totalPages = Math.ceil(filtered.length / perPage);
  if (currentPage > totalPages) {
    currentPage = 1;
  }

  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const table = document.querySelector("table");
  const tableBody = document.getElementById("projects-table-body");
  const cardsContainer = document.getElementById("projects-container");

  if (isDesktop) {
    table.style.display = "table";
    cardsContainer.style.display = "none";
    tableBody.innerHTML = '';
    paginated.forEach(repo => {
      const lang = languageMap[repo.id] || 'Nieznany';
      tableBody.innerHTML += `
        <tr>
          <td><a href="projekt.html?name=${encodeURIComponent(repo.name)}">${repo.name}</a></td>
          <td>${truncate(repo.description || 'Brak opisu')}</td>
          <td>${lang}</td>
        </tr>
      `;
    });
  } else {
    table.style.display = "none";
    cardsContainer.style.display = "grid";
    cardsContainer.innerHTML = '';
    paginated.forEach(repo => {
      const lang = languageMap[repo.id] || 'Nieznany';
      cardsContainer.innerHTML += `
        <a class="card" href="projekt.html?name=${encodeURIComponent(repo.name)}">
          <div class="card-header">
            <h3>${repo.name}</h3>
            <span class="lang">${lang}</span>
          </div>
          <p>${truncate(repo.description || 'Brak opisu')}</p>
        </a>
      `;
    });
  }

  renderPagination(filtered.length, perPage);
}

function renderPagination(totalItems, perPage) {
  const totalPages = Math.ceil(totalItems / perPage);
  const container = document.querySelector('.pagination');
  container.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    container.innerHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderProjects();
}
