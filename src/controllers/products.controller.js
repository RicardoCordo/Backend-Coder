
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateProductErrorInfo, updateProductErrorInfo } from "../errors/info.js";
import productsService from "../repositories/index.products.js"

const getProductsController = async (req, res) => {
    try {

        const user = req.session.user;
        const products = await productsService.getProducts();

        return res.status(200).json({ status: 'success', payload: user, products });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
const getProductIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProduct(id);
        res.json({ status: "success", data: product });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const createProductController = async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            CustomError.createError({
                name: "Error al crear producto",
                cause: generateProductErrorInfo({ title, description, code, price, stock, category }),
                message: "Erroral intentar crear producto",
                code: EErrors.INVALID_TYPES_ERROR,
            })
        }
        const product = req.body;
        const createdProduct = await productsService.createProduct(product);
        res.status(200).json({ status: "success", data: createdProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
};

const updateProductController = async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            CustomError.createError({
                name: "Error al cambiar producto",
                cause: updateProductErrorInfo({ title, description, code, price, stock, category }),
                message: "Erroral intentar cambiar producto",
                code: EErrors.INVALID_TYPES_ERROR,
            })
        };
        
        const { id } = req.params;
        const newProduct = req.body;
        await productsService.updateProduct(id, newProduct);
        res.json({ status: "success", data: newProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productsService.deleteProduct({ _id: id });
        return res.status(200).json({ status: 'success', payload: result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
};


export default {
    createProductController,
    updateProductController,
    getProductsController,
    getProductIdController,
    deleteProductController
};