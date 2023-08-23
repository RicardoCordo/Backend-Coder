import { Router } from "express";
import viewsController from "../../controllers/views.controller.js";
const router = Router();

router.get('/', (req, res) => {
  res.render('login')
})
router.get('/register', (req, res) => {
  res.render('register');
})
router.get("/home", viewsController.getHomeController);
router.get("/products", viewsController.getProductsViewsController);
router.get("/chat", viewsController.getChatViewsController);
router.get("/realtimeproducts", viewsController.getRealtimeProductsController);
router.get("/current", viewsController.getCurrentController);


export default router;

