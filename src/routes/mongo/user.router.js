import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import uploaderFiles from "../../middlewares/uploader.middleware.js";


const router = Router();

router.get('/', userController.getAllUsers);
router.post('/premium/:uid', userController.premiumUser);
router.post('/:uid/documents', uploaderFiles, userController.UploadDocument);
router.delete('/:uid', userController.deleteUser);
router.delete('/', userController.deleteInactiveUsers);
router.put('/role/:uid', userController.roleChange)

export default router; 