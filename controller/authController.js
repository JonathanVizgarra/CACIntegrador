const jwt = require('jsonwebtoken');
const db = require('../db/db');

const login = (req, res) => {
    const { mail, password } = req.body;
    const sql = 'SELECT * FROM Usuarios WHERE mail = ? AND password = ?';
    db.query(sql, [mail, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const token = jwt.sign({ id: result[0].id, mail: result[0].mail }, 'tu_clave_secreta', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    });
};

module.exports = {
    login
};