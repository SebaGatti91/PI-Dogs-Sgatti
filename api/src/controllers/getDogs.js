const { Dog, Temperament } = require("../db");
const axios = require("axios");

const URL = `https://api.thedogapi.com/v1/breeds`;

const getDogs = async (req, res) => {
  try {
    // Hacer una solicitud a la API para obtener datos de razas de perros
    const response = await axios.get(URL);

    // Verificar si la solicitud se realizó con éxito (código de estado 200)
    if (response.status === 200) {
      const data = response.data;

      // Transformar los datos de la API en el formato deseado para el modelo Dogs
      const dogsData = data.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.reference_image_id,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        temperament: dog.temperament,
        created: false, //traído de la API
      }));

      // Consultar todas las razas de perros en la base de datos incluyendo la relación "Temperament"
      const dbFilteredBreeds = await Dog.findAll({
        include: [{ model: Temperament }], // Incluye la relación con Temperament
      });

      //Devemos acomodar los datos para agregar temperaments separados por coma
      const dogsDb = dbFilteredBreeds.map((dog) => {
        const temperamentNames = dog.Temperaments.map(
          (temp) => temp.temperament
        ).join(", "); // filtro y separo por comas
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

      // Combinar los datos de la API y los datos de la base de datos
      const allDogs = [...dogsDb, ...dogsData];

      // Responder con los datos de todas las razas de perros
      res.status(200).json(allDogs);
    } else {
      res
        .status(500)
        .json({ error: "Error al obtener los datos de razas de perros" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getDogs };
