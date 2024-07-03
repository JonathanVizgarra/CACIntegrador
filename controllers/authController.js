const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { nombre, apellido, mail, password, rol_id } = req.body;

    // Verificar si el usuario ya existe
    const sqlCheck = 'SELECT * FROM Usuarios WHERE mail = ?';
    db.query(sqlCheck, [mail], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const sqlInsert = 'INSERT INTO Usuarios (nombre, apellido, mail, password, rol_id) VALUES (?,?,?,?,?)';
        db.query(sqlInsert, [nombre, apellido, mail, hashedPassword, rol_id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Usuario registrado' });
        });
    });
};

const login = (req, res) => {
    const { mail, password } = req.body;

    const sql = 'SELECT * FROM Usuarios WHERE mail = ?';
    db.query(sql, [mail], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = {
    register,
    login
};