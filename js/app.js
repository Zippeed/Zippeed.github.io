// Tema claro/escuro
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// Lightbox simples
const images = document.querySelectorAll('.lightbox');
images.forEach(img => img.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);
  const popup = document.createElement('img');
  popup.src = img.src;
  popup.classList.add('popup');
  overlay.appendChild(popup);
  overlay.addEventListener('click', () => overlay.remove());
}));

// Validação do formulário
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Por favor, preencha todos os campos corretamente.';
    return;
  }
  status.textContent = 'Enviando...';
  setTimeout(() => status.textContent = 'Mensagem enviada com sucesso!', 1000);
});