const axios = require("axios");
const URL = `https://api.thedogapi.com/v1/breeds`;

const getDogByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Realizar una solicitud GET a la API que contiene la información de los perros.
    const response = await axios.get(URL);

    // Verificar si la solicitud se realizó con éxito (código de estado 200)
    if (response.status === 200) {
      const data = response.data;

      // Filtrar las razas de perros que coinciden con el nombre (insensible a mayúsculas y minúsculas)
      const filteredBreeds = data.filter((breed) =>
        breed.name.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredBreeds.length > 0) {
        res.status(200).json(filteredBreeds);
      } else {
        return res.status(404).send("Not Found");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDogByName,
};
