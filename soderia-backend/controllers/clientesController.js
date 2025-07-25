const db = require('../db');

// GET todos los clientes (con posibilidad de filtrado)
exports.getClientes = (req, res) => {
  const { zona, nombre } = req.query;
  let sql = "SELECT * FROM clientes WHERE 1=1";
  let values = [];

  if (zona) {
    sql += " AND zona = ?";
    values.push(zona);
  }

  if (nombre) {
    sql += " AND nombre LIKE ?";
    values.push(`%${nombre}%`);
  }

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// GET cliente individual
exports.getCliente = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM clientes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// POST - Alta de cliente
exports.createCliente = (req, res) => {
  const { nombre, apellido, telefono, direccion, zona } = req.body;
  db.query(
    "INSERT INTO clientes (nombre, apellido, telefono, direccion, zona) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido, telefono, direccion, zona],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
};

// PUT - Modificar cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, direccion, zona } = req.body;
  db.query(
    "UPDATE clientes SET nombre=?, apellido=?, telefono=?, direccion=?, zona=? WHERE id=?",
    [nombre, apellido, telefono, direccion, zona, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
};

// PUT - Alta/Baja lógica
exports.toggleActivo = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE clientes SET activo = NOT activo WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
};
