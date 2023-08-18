import { Router } from "express";
import productController from "../../controllers/products.controller.js";

const router = Router();

router.get("/", productController.getProductsController);
router.get("/:id", productController.getProductIdController)
router.post("/", productController.createProductController);
router.put("/:id", productController.updateProductController);
router.delete("/:id", productController.deleteProductController);

export default router;