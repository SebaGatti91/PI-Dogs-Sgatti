const { Dog, Temperament } = require("../db");
const axios = require("axios");

const URL = `https://api.thedogapi.com/v1/breeds`;

const getDogs = async (req, res) => {
  try {
    // Hacer una solicitud a la API para obtener datos de razas de perros
    const response = await axios.get(URL);

    // Verificar si la solicitud se realizó con éxito (código de estado 200)
    if (response.status !== 200) {
      return res.status(500).json({ error: 'Error en la solicitud a la API' });
    }

    const data = response.data;

    const dogsApi = await Promise.all(
      data.map(async (dog) => {
        const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_ids=${dog.id}`);
        const image = imageResponse.data[0]?.url || ''; // Usar una imagen por defecto si no hay URL

        return {
          id: dog.id,
          name: dog.name,
          image,
          height: dog.height.metric,
          weight: dog.weight.metric,
          life_span: dog.life_span,
          temperament: dog.temperament,
          database: false
        };
      })
    );

    // Consultar todas las razas de perros en la base de datos incluyendo la relación "Temperament"
    const dbFilteredBreeds = await Dog.findAll({
      include: [{ model: Temperament }], // Incluye la relación con Temperament
    });

    // Devemos acomodar los datos para agregar temperaments separados por coma
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
        temperament: temperamentNames,
        database: true
      };
    });

    // Combinar los datos de la API y los datos de la base de datos
    let allDogs = [...dogsDb, ...dogsApi];

    // Verificar si se proporciona un nombre de perro en la consulta
    if (req.query.name) {
      // Filtrar los perros cuyo nombre coincida con el nombre proporcionado en la consulta
      const searchName = req.query.name.toLowerCase();
      allDogs = allDogs.filter((dog) => dog.name.toLowerCase().startsWith(searchName));
    }

    // Responder con los datos de todas las razas de perros, incluyendo la opción de búsqueda por nombre
    res.status(200).json(allDogs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { getDogs };
