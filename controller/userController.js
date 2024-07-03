const db = require('../db/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const ObtenerTodosLosUsuarios = (req, res) => {
    const sql = 'SELECT * FROM Usuarios';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

const ObtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

const crearUsuario = (req, res) => {
    const { nombre, apellido, mail, rol_id } = req.body;
    const archivo = req.file ? req.file.filename : null;
    const sql = 'INSERT INTO Usuarios (nombre, apellido, mail, rol_id, ruta_archivo) VALUES (?,?,?,?,?)';
    db.query(sql, [nombre, apellido, mail, rol_id, archivo], (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Usuario Creado',
            idUsuario: result.insertId
        });
    });
};

const ActualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, mail, rol_id } = req.body;
    const sql = 'UPDATE Usuarios SET nombre = ?, apellido = ?, mail = ?, rol_id = ? WHERE id = ?';
    db.query(sql, [nombre, apellido, mail, rol_id, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario editado' });
    });
};

const BorrarUsuario = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Usuarios WHERE id= ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario eliminado' });
    });
};

module.exports = {
    ObtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    ActualizarUsuario,
    BorrarUsuario,
    upload
};