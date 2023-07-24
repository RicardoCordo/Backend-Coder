import { Router } from "express"
import userModel from "../../dao/mongo/models/user.js"

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const result = await userModel.create(req.body);
        res.send({ status: "success", payload: result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(400).send({ status: "error", error: "Usuario o contraseña incorrectas" });
        }
        let role = "usuario";

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            role = "admin";
        }
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: role
        };
        
        
        res.json({ status: 'success' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

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



export default router
