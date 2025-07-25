const apiUrl = 'http://localhost:3001/api/clientes';

document.addEventListener('DOMContentLoaded', () => {
  cargarClientes();

  document.getElementById('filtroNombre').addEventListener('input', () => {
    resetFormulario();
    cargarClientes();
  });

  document.getElementById('filtroZona').addEventListener('input', () => {
    resetFormulario();
    cargarClientes();
  });

  document.getElementById('clienteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    guardarCliente();
  });
});

async function cargarClientes() {
  const nombre = document.getElementById('filtroNombre').value;
  const zona = document.getElementById('filtroZona').value;

  let url = `${apiUrl}?`;
  if (nombre) url += `nombre=${nombre}&`;
  if (zona) url += `zona=${zona}&`;

  const res = await fetch(url);
  const clientes = await res.json();

  const tbody = document.getElementById('tablaClientes');
  tbody.innerHTML = '';

  clientes.forEach((c, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${c.nombre}</td>
      <td>${c.apellido}</td>
      <td>${c.telefono}</td>
      <td>${c.direccion}</td>
      <td>${c.zona}</td>
      <td>${c.activo ? 'Activo' : 'Inactivo'}</td>
      <td>
        <button onclick="editarCliente(${c.id})">Editar</button>
        <button onclick="toggleEstado(${c.id})">
          ${c.activo ? 'Dar de baja' : 'Dar de alta'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function guardarCliente() {
  const id = document.getElementById('clienteId').value;
  const cliente = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    telefono: document.getElementById('telefono').value,
    direccion: document.getElementById('direccion').value,
    zona: document.getElementById('zona').value
  };

  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
  }

  resetFormulario();
  cargarClientes();
}

async function editarCliente(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const cliente = await res.json();

  document.getElementById('formTitulo').textContent = 'Modificar Cliente';
  document.getElementById('clienteId').value = cliente.id;
  document.getElementById('nombre').value = cliente.nombre;
  document.getElementById('apellido').value = cliente.apellido;
  document.getElementById('telefono').value = cliente.telefono;
  document.getElementById('direccion').value = cliente.direccion;
  document.getElementById('zona').value = cliente.zona;
}

async function toggleEstado(id) {
  await fetch(`${apiUrl}/toggle/${id}`, {
    method: 'PUT'
  });
  cargarClientes();
}

function resetFormulario() {
  document.getElementById('formTitulo').textContent = 'Agregar Cliente';
  document.getElementById('clienteForm').reset();
  document.getElementById('clienteId').value = '';
}
