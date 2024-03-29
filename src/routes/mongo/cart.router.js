import { Router } from "express";
import cartController from "../../controllers/cart.controller.js";
import roleAuth from "../../middlewares/roleAuth.middleware.js";
import isAuthenticated from "../../middlewares/authCompra.middleware.js"

const router = Router();

router.get("/", cartController.getCartsController);
router.get("/:cid", cartController.getCartController);
router.post("/", cartController.createCartController);
router.post('/:cid/product/:productId', roleAuth(['user', 'premium']), cartController.productAddCartController);
router.put('/:cid', cartController.updateCartController);
router.delete('/:cid', cartController.deleteCartController,);
router.delete('/:cid/product/:productId', cartController.deleteProductCartController);
router.post('/:cid/purchase', isAuthenticated, cartController.purchaseCartController);

export default router;