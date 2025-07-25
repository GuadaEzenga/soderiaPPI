const express = require('express');
const router = express.Router();

const {
  getPedidos,
  createPedido,
  updateEstadoPedido  
} = require('../controllers/pedidosController');

router.get('/', getPedidos);
router.post('/', createPedido);
router.put('/estado/:id', updateEstadoPedido);

module.exports = router;
