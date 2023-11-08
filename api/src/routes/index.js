const { Router } = require('express');
const { getTemperaments } = require('../controllers/getTemperaments')
const { getDogs } = require('../controllers/getDogs');
const { getDogById } = require('../controllers/getDogById');
const { postDog } = require('../controllers/postDog');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/temperaments', getTemperaments)
router.get('/dogs', getDogs);
router.get('/dogs/:idRaza', getDogById);
router.post('/dogs/', postDog);


module.exports = router;
