import { Router } from "express"
import passport from "passport";


const router = Router();

router.post('/register', passport.authenticate("register", { failureRedirect: "/failureRedirect" }), async (req, res) => {
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
        };
        res.send({ status: "success", message: "Usuario creado" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.get('/failregister'), async (req, res) => {
    return res.status(500).send("Failed");
}
router.post('/login', passport.authenticate("login", { failureRedirect: "/failureRedirect" }), async (req, res) => {
    try {
        if (!req.user) return response.status(400).send({ status: "failed", message: "Usuario o contraseña incorrectos" })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
        };
        return res.status(200).send({ status: 'success', message: "Usuario logeado" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.get("/github", passport.authenticate("github"), async (req, res) => { });

router.get("/githubcallback", passport.authenticate("github"), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
    };
    res.redirect("/products");
}
);

function auth(req, res, next) {
    try {
        if (req.session?.user?.role === "admin") {
            return next();
        } else {
            throw new Error(`Unauthorized`);
        }
    } catch (err) {
        return res.status(401).send(`Solo los administradores pueden ver esta página`);
    }
}

router.get("/private", auth, (req, res) => {
    try {
        return res.status(200).send(`si ves este mensaje es porque sos admin`);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get("/logout", (req, res) => {
    try {
        req.session.destroy((err) => {
            if (!err) {
                return res.redirect("/");
            };
            return res.status(500).send("Error al desloguear");
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.get("/current", async (req, res) => {
    try {
        if (req.session.user) {
            return res.status(200).render("current", {
                user: req.session.user,
                documentTitle: "Usuario Actual",
            })
                ;
        } else {
            return res.status(401).json({ message: "No hay usuario actualmente autenticado" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router
