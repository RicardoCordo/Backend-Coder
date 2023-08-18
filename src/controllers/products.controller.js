import ProductsManager from "../dao/mongo/manager/products.mongoManager.js";

const getProductsController = async (req, res) => {
    try {
        const products = await ProductsManager.getProducts();
        res.json({ status: "success", data: products });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getProductIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductsManager.getProduct(id);
        res.json({ status: "success", data: product });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


const createProductController = async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ status: "error", message: "Complete todos los campos" });
        }
        const product = req.body;
        const createdProduct = await ProductsManager.createProduct(product);
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
        await ProductsManager.updateProduct(id, newProduct);
        res.json({ status: "success", data: newProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductsManager.deleteProduct({ _id: id });
        res.sendStatus(204);
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
}