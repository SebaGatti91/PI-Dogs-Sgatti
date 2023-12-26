const express = require('express');
const cors = require('cors');
const { conn } = require('./db.js'); // Asegúrate de tener la ruta correcta al archivo db.js

const app = express();

// Configuración de CORS para permitir solicitudes desde la página web de Vercel
const corsOptions = {
  origin: 'https://pi-dogs-sgatti.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita las cookies a través de las solicitudes CORS
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Resto de la configuración del servidor...

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  // Manejo de rutas, etc.

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server raised in port ${port}`);
  });
});

module.exports = app;
