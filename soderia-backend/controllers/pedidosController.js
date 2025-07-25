const db = require('../db');

// GET pedidos con filtro por zona, nombre o fecha
exports.getPedidos = (req, res) => {
  const { zona, nombre, fecha } = req.query;

  let sql = `
  SELECT p.id, c.nombre AS cliente, c.apellido, c.zona, pr.nombre AS producto,
         p.cantidad, p.fecha, p.estado
  FROM pedidos p
  JOIN clientes c ON p.id_cliente = c.id
  JOIN productos pr ON p.id_producto = pr.id
  WHERE 1=1
`;

  const values = [];

  if (zona) {
    sql += " AND c.zona = ?";
    values.push(zona);
  }

  if (nombre) {
    sql += " AND c.nombre LIKE ?";
    values.push(`%${nombre}%`);
  }

  if (fecha) {
    sql += " AND p.fecha = ?";
    values.push(fecha);
  }

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// POST nuevo pedido
exports.createPedido = (req, res) => {
  const { id_cliente, id_producto, cantidad, fecha, estado = 'pendiente' } = req.body;

  db.query(
    "INSERT INTO pedidos (id_cliente, id_producto, cantidad, fecha, estado) VALUES (?, ?, ?, ?, ?)",
    [id_cliente, id_producto, cantidad, fecha, estado],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
};

exports.updateEstadoPedido = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['pendiente', 'entregado', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  db.query(
    "UPDATE pedidos SET estado = ? WHERE id = ?",
    [estado, id],
    (err, result) => {
      if (err) {
        console.error('Error en la consulta UPDATE:', err);
        return res.status(500).json(err);
      }

      console.log('Resultado UPDATE:', result);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      res.json({ success: true });
    }
  );
};
