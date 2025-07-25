// frontend/js/productos.js

const apiUrl = 'http://localhost:3001/api/productos';

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();

  document.getElementById('productoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    guardarProducto();
  });
});

async function cargarProductos() {
  const res = await fetch(apiUrl);
  const productos = await res.json();

  const tbody = document.getElementById('tablaProductos');
  tbody.innerHTML = '';

  productos.forEach((p, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.nombre}</td>
      <td>${p.descripcion || ''}</td>
      <td>$${p.precio ? Number(p.precio).toFixed(2) : '0.00'}</td>
      <td>${p.stock}</td>
      <td>
        <button class="editar" onclick="editarProducto(${p.id})">Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function guardarProducto() {
  const id = document.getElementById('productoId').value;
  const producto = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    precio: parseFloat(document.getElementById('precio').value),
    stock: parseInt(document.getElementById('stock').value)
  };

  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  }

  resetFormulario();
  cargarProductos();
}

async function editarProducto(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const p = await res.json();

  document.getElementById('formTitulo').textContent = 'Modificar Producto';
  document.getElementById('productoId').value = p.id;
  document.getElementById('nombre').value = p.nombre;
  document.getElementById('descripcion').value = p.descripcion;
  document.getElementById('precio').value = p.precio;
  document.getElementById('stock').value = p.stock;
}

function resetFormulario() {
  document.getElementById('formTitulo').textContent = 'Agregar Producto';
  document.getElementById('productoForm').reset();
  document.getElementById('productoId').value = '';
}
