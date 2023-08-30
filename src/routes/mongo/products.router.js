import { Router } from "express";
import productController from "../../controllers/products.controller.js";
import roleAuth from '../../middlewares/roleAuth.middleware.js'
const router = Router();

router.get("/", productController.getProductsController);
router.get("/:id", productController.getProductIdController)
router.post("/", roleAuth ('admin'), productController.createProductController);
router.put("/:id", roleAuth ('admin'), productController.updateProductController);
router.delete("/:id", roleAuth ('admin'), productController.deleteProductController);

export default router; 