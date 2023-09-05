
import productsService from "../repositories/index.products.js"

const getProductsController = async (req, res) => {
    try {

        const user = req.session.user;
        const products = await productsService.getProducts();

        res.render('products', {
            user,
            products,
            totalPages: totalPages, 
            hasPrevPage: hasPrevPage, 
            hasNextPage: hasNextPage, 
            prevPage: prevPage, 
            nextPage: nextPage, 
        });
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
            return res.status(400).json({ status: "error", message: "Complete todos los campos" });
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
            return res.status(400).json({ status: "error", message: "Complete todos los campos" });
        }
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