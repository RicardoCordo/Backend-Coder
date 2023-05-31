import { readFileSync, writeFileSync, existsSync } from "fs";

export default class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!existsSync(this.path)) {
            writeFileSync(this.path, JSON.stringify(this.products));
          }
        this.products = JSON.parse(readFileSync(this.path, "utf-8"));


        const product = {

            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,

        }


        this.products = JSON.parse(readFileSync(this.path, "utf-8"));


        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos deben ser completados')
            return;

        }
        else if (this.products.some(product => product.code === code)) {
            console.log('Este codigo ya existe')
            return;

        }

        this.products.push(product)
        writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        if (!existsSync(this.path))
        writeFileSync(this.path, JSON.stringify(this.products));

        return JSON.parse(readFileSync(this.path, "utf-8"))
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
        writeFileSync(this.path, JSON.stringify(products));


    }
    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex < 0) {
            console.log("No existe el producto con el id: ", id);
            return;
        }

        products.splice(productIndex, 1);
        writeFileSync(this.path, JSON.stringify(products));


    }
}
const product = new ProductManager('productos.json');
//console.log('Como pide la consigna devuelvo un array vacio')
//console.log(product.getProducts());

console.log('Producto agregado')
product.addProduct('producto prueba0', 'Este es un producto prueba1', 200, 'Sin imagen', 'abc001', 25)
product.addProduct('producto prueba2', 'Este es un producto prueba2', 200, 'Sin imagen', 'abc002', 25)
product.addProduct('producto prueba3', 'Este es un producto prueba3', 200, 'Sin imagen', 'abc003', 25)
product.addProduct('producto prueba4', 'Este es un producto prueba4', 200, 'Sin imagen', 'abc004', 25)
product.addProduct('producto prueba5', 'Este es un producto prueba5', 200, 'Sin imagen', 'abc005', 25)
product.addProduct('producto prueba6', 'Este es un producto prueba6', 200, 'Sin imagen', 'abc006', 25)
product.addProduct('producto prueba7', 'Este es un producto prueba7', 200, 'Sin imagen', 'abc007', 25)
product.addProduct('producto prueba8', 'Este es un producto prueba8', 200, 'Sin imagen', 'abc008', 25)
product.addProduct('producto prueba9', 'Este es un producto prueba9', 200, 'Sin imagen', 'abc009', 25)
product.addProduct('producto prueba10', 'Este es un producto prueba10', 200, 'Sin imagen', 'abc010', 25)
product.addProduct('producto prueba11', 'Este es un producto prueba11', 200, 'Sin imagen', 'abc011', 25)

//console.log(product.getProducts());

//console.log('Buscador de Id')
product.getProductById(2)


//console.log('Producto Actualizado')
product.updateProduct(1, 'title', 'producto prueba1')
//console.log(product.getProducts());


//console.log('Producto eliminado')
product.deleteProduct(11)
console.log(product.getProducts());








