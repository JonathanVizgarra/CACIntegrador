const express = require('express');
const app = express();
const path = require('path');
const usuariosRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});