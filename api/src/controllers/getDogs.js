const { Dog } = require("../db");
const axios = require ('axios')
const URL = `https://api.thedogapi.com/v1/breeds`


const getDogs = async (req, res) => {
  try {
    // Hacer una solicitud a la API para obtener datos de razas de perros
    const response = await axios.get(URL);

    // Verificar si la solicitud se realizó con éxito (código de estado 200)
    if (response.status === 200) {
      const data = response.data;

       // Transformar los datos de la API en el formato deseado para el modelo Dogs
      const dogsData = data.map((dog) => ({
        ID: dog.id,
        imagen: dog.reference_image_id,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        anos_vida: dog.life_span,
      }));

      // Guardar los datos de las razas de perros en la base de datos
      const createdDogs = await Dog.bulkCreate(dogsData);

      // Responder con los datos de las razas de perros creados en la base de datos
      res.status(200).json(createdDogs);
    } else {
      // Manejar cualquier otro código de estado de respuesta aquí
      res.status(500).json({ error: 'Error al obtener los datos de razas de perros' });
    }
  } catch (error) {
    console.error('Error al obtener y guardar los datos de razas de perros:', error);
    res.status(500).json({ error: 'Error al obtener los datos de razas de perros' });
  }
};

module.exports = { getDogs };