const { Temperaments } = require("../db");

const getTemperaments = async (req, res) => {
  try {
    // Realizar una solicitud a la API que contiene la información de los perros.
    const response = await fetch(`https://api.thedogapi.com/v1/breeds`);

    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    const data = await response.json();

    // Extrae los temperamentos únicos
    const uniqueTemperaments = Array.from(
      new Set(data.map((dog) => dog.temperament.split(", ")))
    );

    //Set es una estructura de datos en JavaScript que se utiliza para almacenar valores únicos.
    //La principal característica de un conjunto es que no permite elementos duplicados.
    //Cuando intentas agregar un valor que ya existe en un conjunto,
    //este se ignora y no se duplica en el conjunto

    //otra forma puede ser (menos eficiente)
    //const allTemperaments = data.map((dog) => dog.temperament.split(', ')).flat();
    //const uniqueTemperaments = allTemperaments.filter((temperament, index, array) => array.indexOf(temperament) === index);

    // Crea un registro en la base de datos por cada temperamento único
    uniqueTemperaments.forEach((temperamentName) => {
      Temperaments.create({ name: temperamentName })
        .then((temperament) => {
          console.log(`Se ha creado el temperamento: ${temperament.name}`);
        })
        .catch((error) => {
          console.error(
            `Error al crear el temperamento: ${temperamentName}`,
            error
          );
        });
    });

    // Una vez que los temperamentos se han guardado en la base de datos, los obtienes y los envías como respuesta al cliente
    const temperamentsFromDatabase = await Temperaments.findAll();

    res.status(200).json(temperamentsFromDatabase);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getTemperaments,
};
