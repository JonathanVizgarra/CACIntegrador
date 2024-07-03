const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, userController.ObtenerTodosLosUsuarios);
router.get('/:id', verificarToken, userController.ObtenerUsuarioPorId);
router.post('/', verificarToken, userController.upload.single('archivo'), userController.crearUsuario);
router.put('/:id', verificarToken, userController.ActualizarUsuario);
router.delete('/:id', verificarToken, userController.BorrarUsuario);

module.exports = router;