import productModel from "../models/product.model.js";

export default class ProductsDAO {
    constructor() { }
    getProducts = () => {
        try {
            return productModel.find().lean();
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    getProduct = (id) => {
        try {
            return productModel.findById(id)
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    createProduct = (product) => {
        try {
            return productModel.create(product)
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }

    };

    updateProduct = (id, product) => {
        try {
            return productModel.findByIdAndUpdate(id, product)
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }

    };

    deleteProduct = (id) => {
        try {
            return productModel.findByIdAndDelete(id)
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

}
