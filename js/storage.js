const languages = [
  'JavaScript', 
  'Python', 
  'Java', 
  'TypeScript', 
  'C#', 
  'C++', 
  'Go', 
  'Ruby', 
  'PHP', 
  'Swift', 
  'Kotlin', 
  'Rust', 
  'Shell', 
  'Objective-C', 
  'Scala'
];
let languageMap = JSON.parse(localStorage.getItem('languageMap')) || {};

function saveLanguageMap() {
  localStorage.setItem('languageMap', JSON.stringify(languageMap));
}
