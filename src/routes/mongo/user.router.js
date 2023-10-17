import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import uploaderFiles from "../../middlewares/uploader.middleware.js";


const router = Router();

router.post('/premium/:uid', userController.premiumUser);
router.post('/:uid/documents', uploaderFiles, userController.UploadDocument);

export default router; 