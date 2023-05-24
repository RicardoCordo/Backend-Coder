const fs = require("fs");

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
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
            return;

        }
        else if (this.products.some(product => product.code === code)) {
            console.log('Este codigo ya existe')
            return;

        }

        this.products.push(product)
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, JSON.stringify(this.products));

        return JSON.parse(fs.readFileSync(this.path, "utf-8"))
    }



    getProductById(id) {

        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex < 0) {
            console.log("No existe el producto con el id: ", id);
            return;
        }
        return products[productIndex];

    }
    updateProduct(id, field, value) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);


        if (productIndex < 0) {
            console.log("No existe el producto con el id: ", id);
            return;
        }

        const product = products[productIndex]

        if (!product) {
            console.log("No existe el producto con el id: ", id)
            return;
        };

        if (!(field in product)) {
            console.log("No existe el campo ", field, " en el producto con el id:", id);
            return;
        };

        if (!value) {
            console.log("Ingrese un valor valido")
            return;
        };
        product[field] = value;
        fs.writeFileSync(this.path, JSON.stringify(products));


    }
    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex < 0) {
            console.log("No existe el producto con el id: ", id);
            return;
        }

        products.splice(productIndex, 1);
        fs.writeFileSync(this.path, JSON.stringify(products));


    }
}
const product = new ProductManager('productos.json');
console.log('Como pide la consigna devuelvo un array vacio')
console.log(product.getProducts());

console.log('Producto agregado')
product.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
product.addProduct('producto prueba2', 'Este es un producto prueba2', 200, 'Sin imagen', 'abc124', 25)
console.log(product.getProducts());

console.log('Buscador de Id')
product.getProductById(2)


console.log('Producto Actualizado')
product.updateProduct(1, 'title', 'producto prueba3')
console.log(product.getProducts());


console.log('Producto eliminado')
product.deleteProduct(1)
console.log(product.getProducts());









