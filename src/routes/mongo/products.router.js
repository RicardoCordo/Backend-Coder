import { Router } from "express";
import ProductsManager from "../../dao/mongo/manager/products.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts();
    res.json({ status: "success", data: products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsManager.getProduct(id);
    res.json({ status: "success", data: product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ status: "error", message: "Complete todos los campos" });
    }
    const product = req.body;
    const createdProduct = await productsManager.createProduct(product);
    res.status(200).json({ status: "success", data: createdProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ status: "error", message: "Complete todos los campos" });
    }
    const { id } = req.params;
    const newProduct = req.body;
    await productsManager.updateProduct(id, newProduct);
    res.json({ status: "success", data: newProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await productsManager.deleteProduct({ _id: id });
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
});



export default router;