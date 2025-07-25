document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('userId'); // Borra sesión
  window.location.href = 'index.html'; // Vuelve al login
});
