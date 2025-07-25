const db = require('../db');

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  db.query(
    "SELECT * FROM usuarios WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      // Login exitoso
      res.json({ message: 'Login correcto', userId: results[0].id });
    }
  );
};
