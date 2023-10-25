const axios = require('axios');
const { Dog } = require('../db');

const URL = 'https://api.thedogapi.com/v1/breeds/';

const getDogById = async (req, res) => {
  const { idRaza } = req.params;

  if (/^\d+$/.test(idRaza)) {
    // Si idRaza es una cadena que contiene solo dígitos, asumimos que es un INTEGER
    // y buscamos en la API
    try {
      const response = await axios.get(URL + idRaza);
      if (response.status === 200) {
        const data = response.data;
        if (Object.keys(data).length === 0) {
          return res.status(404).send('No existe ese ID');
        }

        const dog = {
          id: idRaza,
          name: data.name,
          image: data.reference_image_id,
          height: data.height,
          weight: data.weight,
          life_span: data.life_span,
        };
        return res.status(200).json(dog);
      } else {
        return res.status(404).send('No existe ese ID');
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    // Si idRaza no es un INTEGER, asumimos que es una STRING
    // y buscamos en la base de datos
    try {
      const dog = await Dog.findOne({ where: { id: idRaza } });
      if (dog) {
        return res.status(200).json(dog);
      } else {
        return res.status(404).send('No existe ese ID');
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

module.exports = {
  getDogById,
};