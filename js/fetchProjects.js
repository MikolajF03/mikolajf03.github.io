let allProjects = [];

function fetchAllProjects() {
  let page = 1;
  const MAX_PROJECTS = 60;
  let fetched = [];

  function fetchNext() {
    fetch(`https://api.github.com/orgs/microsoft/repos?per_page=30&page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || !data.length) {
          finalize();
          return;
        }

        data.forEach(repo => {
          if (!languageMap[repo.id]) {
            languageMap[repo.id] = repo.language || 'Brak języka';
          }
        });

        fetched = fetched.concat(data);

        if (fetched.length >= MAX_PROJECTS) {
          finalize();
        } else {
          page++;
          fetchNext();
        }
      })
      .catch(() => {
        finalize();
      });
  }

  function finalize() {
    allProjects = fetched.slice(0, MAX_PROJECTS);
    saveLanguageMap();
    renderProjects();
  }

  fetchNext();
}
