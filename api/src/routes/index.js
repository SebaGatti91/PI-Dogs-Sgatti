const { Router } = require('express');
const { getTemperaments } = require('../controllers/getTemperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/temperaments', getTemperaments);

module.exports = router;
