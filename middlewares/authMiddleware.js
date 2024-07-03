const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }
    jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verificarToken;