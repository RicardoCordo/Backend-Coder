import productModel from "../models/product.model.js";

export default class ProductsManager {
    
    static getProducts = () => {
        return productModel.find().lean();
    };

    static getProduct = (id) => {
        return productModel.findById(id)
    };

    static createProduct = (product) => {
        return productModel.create(product)

    };

    static updateProduct = (id, product) => {
        return productModel.findByIdAndUpdate(id, product)

    };

    static deleteProduct = (id) => {
        return productModel.findByIdAndDelete(id)
    };

}
