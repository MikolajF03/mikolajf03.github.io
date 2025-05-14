let allProjects = [];

function fetchAllProjects() {
  let page = 1;
  let fetched = [];
  const MAX_PROJECTS = 35;
  let totalFetched = 0;

  function fetchNext() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          finalize();
          return;
        }

        data.forEach(post => {
          if (!languageMap[post.id]) {
            languageMap[post.id] = languages[Math.floor(Math.random() * languages.length)];
          }
        });

        fetched = fetched.concat(data);
        totalFetched += data.length;

        if (totalFetched >= MAX_PROJECTS) {
          finalize();
        } else {
          page++;
          fetchNext();
        }
      });
  }

  function finalize() {
    allProjects = fetched.slice(0, MAX_PROJECTS);
    saveLanguageMap();
    renderProjects();
  }

  fetchNext();
}
