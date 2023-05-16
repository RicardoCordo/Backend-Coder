class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const product = {

            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,

        }


        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos deben ser completados')


        }
        else if (this.products.some(product => product.code === code)) {
            console.log('Este codigo ya existe')

        }

        else (this.products.push(product))

    }

    getProducts() {
        return this.products
    }

    exist(id) {
        return this.products.find((product) => product.id === id);
    }

    getProductById(id) {
        !this.exist(id) ? console.log("Not found") : console.log(this.exist(id));
    }
}

const product = new ProductManager();
console.log('Como pide la consigna devuelvo un array vacio')
console.log(product.getProducts());

console.log('Producto agregado')
product.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
product.addProduct('producto prueba2', 'Este es un producto prueba2', 200, 'Sin imagen', 'abc124', 25)
console.log(product.getProducts());

console.log('Producto agregado nuevamente (3), no lo agrega por codigo ya existente')
product.addProduct('producto prueba3', 'Este es un producto prueba3', 200, 'Sin imagen', 'abc123', 25)
console.log(product.getProducts());

console.log('Buscador de Id')
product.getProductById(2)

console.log('Buscador de Id Inexistente con mensaje de error')
product.getProductById(4)









