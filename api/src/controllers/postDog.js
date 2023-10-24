const { Dog } = require('../db');

const postDog = async (req, res) => {
    try {
        const { name, image, height, weight, life_span } = req.body;

        if (!name || !image || !height || !weight || !life_span) {
            return res.status(400).send("Faltan datos");
        }

        // Buscar un perro con el mismo nombre
        const [dog, dogCreated] = await Dog.findOrCreate({
            where: { name }, // Búsqueda basada en el nombre
            defaults: {
                name,
                image,
                height,
                weight,
                life_span,
                created: true
            }
        });

        if (!dogCreated) {
            return res.status(409).send("Ya existe esa raza de perro");
        }

        const allDogs = await Dog.findAll();
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    postDog
};