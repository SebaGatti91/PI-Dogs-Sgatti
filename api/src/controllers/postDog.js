const { Dog, Temperament } = require("../db");

const postDog = async (req, res) => {
  try {
    const { name, image, height, weight, life_span, temperament } = req.body;

    if (!name || !image || !height || !weight || !life_span || !temperament) {
      return res.status(400).send("Faltan datos");
    }

    const temperamentsArray = temperament.split(',').map(t => t.trim()); // Divide los temperamentos en un array

    // Buscar un perro con el mismo nombre
    const [dog, dogCreated] = await Dog.findOrCreate({
      where: { name }, // Búsqueda basada en el nombre
      defaults: {
        name,
        image,
        height,
        weight,
        life_span,
        created: true,
      },
    });
    if (!dogCreated) {
      return res.status(409).send("Ya existe esa raza de perro");
    }

    // Recorre los temperamentos y agrégalos al perro
    for (const tempName of temperamentsArray) {
      // Buscar el temperamento por su nombre
      const foundTemperament = await Temperament.findOne({
        where: { temperament: tempName }, // Búsqueda basada en el nombre del temperamento
      });

      if (!foundTemperament) {
        return res
          .status(404)
          .send(
            `El temperamento "${tempName}" no se encontró en la base de datos`
          );
      }

      // Agregar el temperamento al perro
      await dog.addTemperament(foundTemperament);
    }

    return res.status(200).send("Temperamento/s asociado");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  postDog,
};
