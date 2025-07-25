const express = require('express');
const router = express.Router();
const {
  getProductos,
  createProducto,
  updateProducto,
  getProducto
} = require('../controllers/productosController');

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);

module.exports = router;
