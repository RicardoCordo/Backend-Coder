
import config from "../config/config.js";
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
        const adminEmail = config.adminEmail;
        const user = req.session.user;
        const { title, description, code, price, stock, category } = req.body;
        let owner = user.email;
        if (user.role !== 'premium') {
            owner = adminEmail;
        }
        if (!title || !description || !code || !price || !stock || !category || !owner) {
            CustomError.createError({
                name: "Error al crear producto",
                cause: generateProductErrorInfo({ title, description, code, price, stock, category, owner }),
                message: "Error al intentar crear producto",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }

        const product = { ...req.body, owner };
        const createdProduct = await productsService.createProduct(product);
        res.status(200).json({ status: "success", data: (createdProduct)});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = req.body;
        const product = await productsService.getProduct(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
            CustomError.createError({
                name: "Error al cambiar producto",
                cause: updateProductErrorInfo(newProduct),
                message: "Error al intentar cambiar producto",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }

        if (req.session.user.role === 'admin' || req.session.user.email === product.owner) {
            await productsService.updateProduct(id, newProduct);
            return res.status(200).json({ status: 'success', data: newProduct });
        } else {
            return res.status(403).json({ error: 'No tienes permiso para actualizar este producto' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProduct({ _id: id });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        if (req.session.user.role === 'admin' || req.session.user.email === product.owner) {
            await productsService.deleteProduct(id); 
            return res.status(200).json({ status: 'success', message: 'Producto eliminado con éxito' });
        } else {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este producto' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


export default {
    createProductController,
    updateProductController,
    getProductsController,
    getProductIdController,
    deleteProductController
};