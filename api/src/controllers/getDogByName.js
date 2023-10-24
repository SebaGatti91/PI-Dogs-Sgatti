const axios = require("axios");
const { Dog } = require("../db");
const { Op } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds";

const getDogByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Realizar una solicitud GET a la API que contiene la información de los perros.
    const response = await axios.get(URL);

    // Verificar si la solicitud se realizó con éxito (código de estado 200)
    if (response.status === 200) {
      const data = response.data;

      // Filtrar las razas de perros que comienzan con el nombre especificado (insensible a mayúsculas y minúsculas)
      const apiFilteredBreeds = data.filter((breed) =>
        breed.name.toLowerCase().startsWith(name.toLowerCase())
      );

      // Buscar en la base de datos por nombre
      const dbFilteredBreeds = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}%`, // Búsqueda insensible a mayúsculas y minúsculas
          },
        },
      });

      // Combinar los resultados de la API y la base de datos
      const allFilteredBreeds = [...apiFilteredBreeds, ...dbFilteredBreeds];

      if (allFilteredBreeds.length > 0) {
        res.status(200).json(allFilteredBreeds);
      } else {
        return res.status(404).send("Raza no encontrada");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDogByName,
};
