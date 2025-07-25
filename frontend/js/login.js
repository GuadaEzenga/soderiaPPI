// frontend/js/login.js

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  const res = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    // Guardar sesión local
    localStorage.setItem('userId', data.userId);
    window.location.href = 'home.html'; // Redirige al panel principal
  } else {
    errorMsg.textContent = data.error || 'Error al iniciar sesión';
  }
});
