// frontend/js/pedidos.js

const apiPedidos = 'http://localhost:3001/api/pedidos';
const apiClientes = 'http://localhost:3001/api/clientes';
const apiProductos = 'http://localhost:3001/api/productos';

document.addEventListener('DOMContentLoaded', () => {
  cargarClientes();
  cargarProductos();
  cargarPedidos();

  document.getElementById('pedidoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    guardarPedido();
  });

  // Aquí agregamos los event listeners a los filtros para que carguen la tabla automáticamente al cambiar
  document.getElementById('filtroNombre').addEventListener('input', cargarPedidos);
  document.getElementById('filtroZona').addEventListener('input', cargarPedidos);
  document.getElementById('filtroFecha').addEventListener('change', cargarPedidos);
});

async function cargarClientes() {
  const res = await fetch(apiClientes);
  const clientes = await res.json();

  const clienteSelect = document.getElementById('clienteSelect');
  clienteSelect.innerHTML = '<option value="">Seleccione un cliente</option>';

  clientes.forEach(c => {
    if (c.activo) { // solo clientes activos
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = `${c.nombre} ${c.apellido} (${c.zona})`;
      clienteSelect.appendChild(option);
    }
  });
}

async function cargarProductos() {
  const res = await fetch(apiProductos);
  const productos = await res.json();

  const productoSelect = document.getElementById('productoSelect');
  productoSelect.innerHTML = '<option value="">Seleccione un producto</option>';

  productos.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.nombre;
    productoSelect.appendChild(option);
  });
}

async function cargarPedidos() {
  const nombre = document.getElementById('filtroNombre').value;
  const zona = document.getElementById('filtroZona').value;
  const fecha = document.getElementById('filtroFecha').value;

  let url = `${apiPedidos}?`;
  if (nombre) url += `nombre=${nombre}&`;
  if (zona) url += `zona=${zona}&`;
  if (fecha) url += `fecha=${fecha}&`;

  const res = await fetch(url);
  const pedidos = await res.json();

  const tbody = document.getElementById('tablaPedidos');
  tbody.innerHTML = '';

  pedidos.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${i + 1}</td>
    <td>${p.cliente}</td>
    <td>${p.apellido}</td>
    <td>${p.zona}</td>
    <td>${p.producto}</td>
    <td>${p.cantidad}</td>
    <td>${new Date(p.fecha).toLocaleDateString()}</td>
    <td>${p.estado || 'pendiente'}</td>
    <td>
      <select id="selectEstado${p.id}">
        <option value="pendiente" ${p.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
        <option value="entregado" ${p.estado === 'entregado' ? 'selected' : ''}>Entregado</option>
        <option value="cancelado" ${p.estado === 'cancelado' ? 'selected' : ''}>Cancelado</option>
      </select>
      <button id="btnGuardar${p.id}">Guardar</button>
    </td>
  `;
    tbody.appendChild(tr);

    document.getElementById(`btnGuardar${p.id}`).addEventListener('click', () => {
      guardarEstado(p.id);
    });
  });

}


async function guardarPedido() {
  const id = document.getElementById('pedidoId').value;
  const id_cliente = document.getElementById('clienteSelect').value;
  const id_producto = document.getElementById('productoSelect').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const fecha = document.getElementById('fecha').value;

  if (!id_cliente || !id_producto || !cantidad || !fecha) {
    alert('Por favor completa todos los campos');
    return;
  }

  const pedidoData = { id_cliente, id_producto, cantidad, fecha };

  // Crear nuevo pedido
  const res = await fetch(apiPedidos, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedidoData),
  });

  if (!res.ok) {
    alert('Error al guardar el pedido');
    return;
  }

  resetFormulario();
  cargarPedidos();
}

async function cambiarEstado(id, nuevoEstado) {
  const res = await fetch(`${apiPedidos}/estado/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  if (!res.ok) {
    alert('Error al cambiar el estado');
    cargarPedidos(); // recarga para actualizar la tabla
  }
}

function resetFormulario() {
  document.getElementById('pedidoForm').reset();
  document.getElementById('formTitulo').textContent = 'Agregar Pedido';
  document.getElementById('pedidoId').value = '';
}

async function guardarEstado(id) {
  const select = document.getElementById(`selectEstado${id}`);
  const nuevoEstado = select.value;

  try {
    const res = await fetch(`${apiPedidos}/estado/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    });


    if (!res.ok) {
      throw new Error('Error al actualizar el estado');
    }

    alert('Estado actualizado correctamente');
    cargarPedidos();
  } catch (error) {
    alert(error.message);
  }
}

window.guardarEstado = guardarEstado;
