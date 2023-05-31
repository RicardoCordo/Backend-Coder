import express from 'express';
import ProductManager from "./productos.js";

const productos = new ProductManager('./data/productos.json');

const app = express();
const port = 8080;


app.get('/products', (req, res) => {
  const { limit } = req.query;
  const products = productos.getProducts();
  let cantProducts;
  if (limit)
    cantProducts = products.slice(0, limit)
    else 
    cantProducts = products

  return res.json(cantProducts);
})

app.get ('/products/:pid', (req, res) => {
  const {pid} = req.params
  
  return res.json(productos.getProductById(parseInt(pid)))
})
 



app.listen(port, () => {
  console.log('corriendo en el puerto', port)
});


