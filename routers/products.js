import { Router } from 'express';
import ProductManager from '../src/products.js';

const router = Router()
const productos = new ProductManager('./data/products.json');



router.get('/', (req, res) => {
    const { limit } = req.query;
    const products = productos.getProducts();
    let cantProducts;
    if (limit)
        cantProducts = products.slice(0, limit)
    else
        cantProducts = products

    return res.json(cantProducts);
});

router.get('/:pid', (req, res) => {
    const { pid } = req.params

    return res.json(productos.getProductById(parseInt(pid)))
});


router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    const result = productos.addProduct(title, description, code, price, status, stock, category, thumbnail);

    return res.json({ result });
});


router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = productos.updateProduct(parseInt(pid), req.body);
    return res.json({ result });
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = productos.deleteProduct(parseInt(pid));
    return res.json({ result });
});

export default router;