import { Router } from "express";
import cookieParser from "cookie-parser";
import config from '../../config/config.js'
import cookiesController from "../../controllers/cookies.controller.js";

const router = Router();
router.use(cookieParser(config.secretCode));

router.get("/set", cookiesController.setCookieController);

router.get("/get",cookiesController.getCookieController);

router.get("/delete", cookiesController.deleteCookieController);

export default router;