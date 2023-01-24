//Faker
import faker from 'faker';
faker.locale ='es';

// Inicio faker

function combinacionesRandom() {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

export default combinacionesRandom;