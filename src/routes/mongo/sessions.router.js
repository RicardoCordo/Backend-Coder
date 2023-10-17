import { Router } from "express"
import passport from "passport";
import sessionsController from "../../controllers/sessions.controller.js";
import auth from "../../middlewares/auth.middleware.js";
import roleAuth from "../../middlewares/roleAuth.middleware.js";


const router = Router();

router.post('/register', passport.authenticate("register", { failureRedirect: "/failureRedirect" }), async (req, res) => {
    sessionsController.registerUser(req, res);
});

router.get('/failregister', async (req, res) => {
    return res.status(500).send("Failed");
});
router.post('/login', passport.authenticate("login", { failureRedirect: "/failureRedirect" }), async (req, res) => {
    sessionsController.loginUser(req, res);
});

router.get("/github", passport.authenticate("github"), async (req, res) => { });

router.get("/githubcallback", passport.authenticate("github"), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
    };
    res.redirect("/home");
}
);

router.get("/private", auth, sessionsController.adminUser);
router.get("/logout", sessionsController.logoutUser);
router.get("/current", roleAuth('admin'), sessionsController.currentUser)
router.post('/restore', sessionsController.restorePassword);
router.post('/restoreCallback', sessionsController.restoreCallback);



export default router
