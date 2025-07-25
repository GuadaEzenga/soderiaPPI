const express = require('express');
const cors = require('cors');
const app = express();
const clientesRoutes = require('./routes/clientes');
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/clientes', clientesRoutes);

app.listen(3001, () => {
  console.log('🚀 Backend corriendo en http://localhost:3001');
});
