const express = require('express');
const router = express.Router();
const {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  toggleActivo
} = require('../controllers/clientesController');

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.put('/toggle/:id', toggleActivo);

module.exports = router;
