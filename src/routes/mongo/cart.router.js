import { Router } from "express";
import cartController from "../../controllers/cart.controller.js";


const router = Router();

router.get("/", cartController.getCartsController);

router.get("/:cid", cartController.getCartController);

router.post("/", cartController.createCartController);

router.post('/:cid/product/:productId', cartController.productAddCartController);

router.put('/:cid',cartController.updateCartController);

router.delete('/:cid', cartController.deleteCartController,);

router.delete('/:cid/product/:productId', cartController.deleteProductCartController   );

export default router;