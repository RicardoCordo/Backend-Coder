import { Router } from "express";
import productController from "../../controllers/products.controller.js";
import roleAuth from '../../middlewares/roleAuth.middleware.js'

const router = Router();

router.get("/", productController.getProductsController);
router.get("/:id", productController.getProductIdController)
router.post("/", roleAuth(['admin', 'premium']), productController.createProductController);
router.put("/:id", roleAuth(['admin', 'premium']), productController.updateProductController);
router.delete("/:id", roleAuth(['admin', 'premium']), productController.deleteProductController);

export default router; 