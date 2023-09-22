import { Router } from "express";
import cookiesController from "../../controllers/cookies.controller.js";

const router = Router();


router.get("/set", cookiesController.setCookieController);

router.get("/get",cookiesController.getCookieController);

router.get("/delete", cookiesController.deleteCookieController);

export default router;