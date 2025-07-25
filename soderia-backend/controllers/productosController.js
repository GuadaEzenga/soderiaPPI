const db = require('../db');

exports.getProductos = (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// POST - Crear producto
exports.createProducto = (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  db.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
    [nombre, descripcion, precio, stock],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
};

// PUT - Modificar producto
exports.updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  db.query(
    "UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?",
    [nombre, descripcion, precio, stock, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
};

// GET producto individual
exports.getProducto = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};
