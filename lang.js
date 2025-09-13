let translations = {};
let currentLang = localStorage.getItem('lang') || 'en';

// Detect current page name robustly
let path = window.location.pathname;
let pageName = path.substring(path.lastIndexOf('/') + 1); // get last part of URL
if (!pageName) pageName = 'index';            // if empty, default to index
else pageName = pageName.split('.')[0];       // remove extension if exists

// Load the JSON file for the page
fetch(`${pageName}.json`)
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyTranslations();
  })
  .catch(err => console.error(`Translation file not found: ${pageName}.json`, err));

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = currentLang === 'en' ? 'தமிழ்' : 'English';
  }
}

// Toggle language when button is clicked
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'langToggle') {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  }
});
