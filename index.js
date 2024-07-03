const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuariosRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');

app.use('/api/usuarios', usuariosRouter);
app.use('/api/auth', authRouter);

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ruta para servir las vistas
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});