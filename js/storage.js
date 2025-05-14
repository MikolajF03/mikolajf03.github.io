const languages = ['JavaScript', 'Python', 'Java'];
let languageMap = JSON.parse(localStorage.getItem('languageMap')) || {};

function saveLanguageMap() {
  localStorage.setItem('languageMap', JSON.stringify(languageMap));
}
