export const generateProductErrorInfo = (products) => {
    return `Una o más propiedades están incompletas o no son válidas. Lista de propiedades requeridas:
    * title: tiene que ser String, recibido ${products.title}
    * description: tiene que ser String, recibido ${products.description}
    * code: tiene que ser String, recibido ${products.code}
    * price: tiene que ser String, recibido ${products.price}
    * stock: tiene que ser String, recibido ${products.stock}
    * category: tiene que ser String, recibido ${products.category}`;
}

export const updateProductErrorInfo = (products) => {
    return `Una o más propiedades están incompletas o no son válidas. Lista de propiedades requeridas:
    * title: tiene que ser String, recibido ${products.title}
    * description: tiene que ser String, recibido ${products.description}
    * code: tiene que ser String, recibido ${products.code}
    * price: tiene que ser String, recibido ${products.price}
    * stock: tiene que ser String, recibido ${products.stock}
    * category: tiene que ser String, recibido ${products.category}`;
}

export const addProductToCartErrorInfo = (product) => {
    return `Una o más propiedades están incompletas o no son válidas. Lista de propiedades requeridas:
    * ProductId: tiene que existir, recibido ${product.productId}
    * Quantity: tiene que ser de tipo numerico y mayor que 0, recibido ${product.quantity}`;
}