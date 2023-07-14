import { Router } from "express";
//import ProductsManager from "../../dao/mongo/manager/products.js";
import productModel from "../../dao/mongo/models/product.js";

const router = Router();
//const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  /*const products = await productsManager.getProducts();
  res.render("products", { products });*/
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage,totalPages,payload, ...rest } =
    await productModel.paginate({}, { page, limit: 5, lean: true });
  const products = docs;
  res.render("products", {
    products,
    page: rest.page,
    payload: products,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,

  });
});

export default router;