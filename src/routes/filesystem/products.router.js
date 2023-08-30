import { Router } from 'express';
import ProductsManager from '../../dao/filesystem/manager/products.fsManager.js';

const router = Router()
const productsData = new ProductsManager('./data/products.json');


router.get('/', (req, res) => {
    const { limit } = req.query;
    const products = productsData.getProducts();
    let cantProducts;
    if (limit)
        cantProducts = products.slice(0, limit)
    else
        cantProducts = products

    return res.json(cantProducts);
});

router.get('/:pid', (req, res) => {
    const { pid } = req.params

    return res.json(productsData.getProductById(parseInt(pid)))
});


router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    const result = productos.addProduct(title, description, code, price, status, stock, category, thumbnail);

    return res.json({ result });
});


router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = productsData.updateProduct(parseInt(pid), req.body);
    return res.json({ result });
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = productsData.deleteProduct(parseInt(pid));
    return res.json({ result });
});

export default router;