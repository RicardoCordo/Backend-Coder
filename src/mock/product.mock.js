import { faker } from '@faker-js/faker/locale/es';

const descriptionNumber = faker.string.numeric({ min: 1, max: 150 })
const description = `Este es un producto prueba ${descriptionNumber}`;

const categoryNumber = faker.string.numeric({ min: 1, max: 10 })
const category = `categoria ${categoryNumber}`;

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description,
        code: faker.finance.accountNumber({ length: 5 }),
        price: faker.commerce.price({ min: 100, max: 1500, dec: 0, symbol: '$' }),
        status: true,
        stock: faker.string.numeric({ min: 50, max: 200 }),
        category
    };
};
