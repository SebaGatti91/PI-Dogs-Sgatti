const axios = require("axios");
const { Dog, Temperament } = require("../db");
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

      // Mapear los resultados filtrados a un nuevo formato de objeto "dog" ya que me quedo con los campos que necesito
      const dogsApi = apiFilteredBreeds.map((breed) => ({
        id: breed.id, // Supongo que hay un campo "id" en el objeto "breed"
        name: breed.name,
        image: breed.reference_image_id,
        height: breed.height,
        weight: breed.weight,
        life_span: breed.life_span,
        temperament: breed.temperament,
      }));

      // Buscar en la base de datos por nombre
      const dbFilteredBreeds = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}%`, // Búsqueda insensible a mayúsculas y minúsculas en la bd ya tienen formato
          },
        },
        include: [{ model: Temperament }], // Incluye la relación con Temperament
      });

      //Devemos acomodar los datos para agregar temperaments separados por coma
      const dogsDb = dbFilteredBreeds.map((dog) => {
        const temperamentNames = dog.Temperaments.map((temp) => temp.temperament).join(', '); // filtro y separo por comas
        return {
          id: dog.id,
          name: dog.name,
          image: dog.image,
          height: dog.height,
          weight: dog.weight,
          life_span: dog.life_span,
          temperaments: temperamentNames,
        };
      });
      
    
      // Combinar los resultados de la API y la base de datos
      const allFilteredBreeds = [...dogsApi, ...dogsDb];

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
