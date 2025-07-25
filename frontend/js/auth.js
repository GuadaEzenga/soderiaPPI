// frontend/js/auth.js
if (!localStorage.getItem('userId')) {
  window.location.href = 'index.html'; // Redirige al login si no hay sesión
}
