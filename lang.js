let translations = {};
let currentLang = localStorage.getItem('lang') || 'en';

// Detect current page name (index.html → index)
const pageName = window.location.pathname.split('/').pop().split('.')[0] || 'index';

// Load the correct JSON file dynamically
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
