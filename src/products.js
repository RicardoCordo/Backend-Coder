import { readFileSync, writeFileSync, existsSync } from "fs";

export default class ProductManager {
    
    constructor(path) {
        this.products = [];
        this.path = path;
    }
    
    addProduct(title, description, code, price, status, stock, category, thumbnail) {
        
        if (!existsSync(this.path)) {
            writeFileSync(this.path, JSON.stringify(this.products));
        }
        this.products = JSON.parse(readFileSync(this.path, "utf-8"));
        
        
        const product = {
            
            id: this.products.length + 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
            
        }
        
        
        this.products = JSON.parse(readFileSync(this.path, "utf-8"));
        
        
        if (!title || !description || !code || !price || !status || !stock || !category) {
            return 'Todos los campos deben ser completados';
            
        }
        else if (this.products.some(product => product.code === code)) {
            return 'Este codigo ya existe';
            
        }
        
        this.products.push(product)
        writeFileSync(this.path, JSON.stringify(this.products));
        
        return product;
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
            
            return `No existe el producto con el id:  ${id}`;
        }
        return products[productIndex];
        
    }
    updateProduct(id, body) {
        
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        let product = products[productIndex];
        
        if (!product) {
            return `No existe el producto con el id:  ${id}`;
        };
        
        if (!body) {
            return 'Ingrese un valor valido';
        };
        
        const newProduct = {
            id: product.id,
            title: body.title || product.title,
            description: body.description || product.description,
            code: body.code || product.code,
            price: body.price || product.price,
            status: body.status || product.status,
            stock: body.stock || product.stock,
            category: body.category || product.category,
            thumbnail: body.thumbnail || product.thumbnail
        }
        
        product = newProduct;
        products[productIndex] = product
        writeFileSync(this.path, JSON.stringify(products));
        
        return product;
        
        
    }
    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        
        if (productIndex < 0) {
            
            return `No existe el producto con el id:  ${id}`;;
        }
        
        products.splice(productIndex, 1);
        writeFileSync(this.path, JSON.stringify(products));
        return true
        
    }
}


const product = new ProductManager('./data/products.json');

