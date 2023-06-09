import express from 'express';
import products from '../routers/products.js'
import carts from '../routers/carts.js'

const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products);
app.use('/api/carts', carts);

app.get('/', function (req, res) {
  return res.send('Primer pre-entrega final')
});


app.listen(port, () => {
  console.log('corriendo en el puerto', port)
});


