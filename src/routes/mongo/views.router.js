import { Router } from "express";
import viewsController from "../../controllers/views.controller.js";
import roleAuth from "../../middlewares/roleAuth.middleware.js";

const router = Router();

router.get('/', viewsController.loginController);
router.get('/register', viewsController.registerController);
router.get("/home", viewsController.getHomeController);
router.get("/products", viewsController.getProductsViewsController);
router.get("/chat", viewsController.getChatViewsController);
router.get('/cart', viewsController.getCartViewsController);
router.get("/realtimeproducts", viewsController.getRealtimeProductsController);
router.get("/current", viewsController.getCurrentController);
router.get('/restore', viewsController.getRestoreController);
router.get('/admin', roleAuth(['admin']), viewsController.getAdminView);



export default router;

