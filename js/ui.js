let currentPage = 1;

function renderProjects() {
  const isDesktop = window.innerWidth >= 1024;
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const selectedLanguage = document.getElementById('filter').value;
  const sortOption = document.getElementById('sort').value;

  let filtered = allProjects.filter(post => {
    const title = post.title.toLowerCase();
    const lang = languageMap[post.id];
    return title.includes(searchQuery) && (!selectedLanguage || lang === selectedLanguage);
  });

  if (sortOption === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'name-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
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
    paginated.forEach(post => {
      const lang = languageMap[post.id];
      tableBody.innerHTML += `
        <tr>
          <td><a href="https://jsonplaceholder.typicode.com/posts/${post.id}" target="_blank">${post.title}</a></td>
          <td>${post.body || 'Brak opisu'}</td>
          <td>${lang}</td>
        </tr>
      `;
    });
  } else {
    table.style.display = "none";
    cardsContainer.style.display = "grid";
    cardsContainer.innerHTML = '';
    paginated.forEach(post => {
      const lang = languageMap[post.id];
      cardsContainer.innerHTML += `
        <a class="card" href="https://jsonplaceholder.typicode.com/posts/${post.id}" target="_blank">
          <div class="card-header">
            <h3>${post.title}</h3>
            <span class="lang">${lang}</span>
          </div>
          <p>${post.body || 'Brak opisu'}</p>
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
