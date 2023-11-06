import UserDTO from "../DTOs/user.dto.js"
import cartsService from "../repositories/index.carts.js";
import sessionsService from "../repositories/index.sessions.js";

const registerUser = async (req, res) => {
    try {
        const newCart = await cartsService.createCart();
        if (!newCart || !newCart._id) {
            return res.status(500).json({ error: 'Error al crear el carrito.' });
        }
        const user = new UserDTO({
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: newCart._id
        });
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
const loginUser = async (req, res) => {
    try {
        if (!req.user) return res.status(400).send({ status: "failed", message: "Usuario o contraseña incorrectos" });

        const cartId = req.user.cart || undefined;

        req.user.last_connection = new Date();       
        await req.user.save();

        const user = new UserDTO({
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: cartId,
        });
        req.session.user = user;
        return res.status(200).send({ status: 'success', message: "Usuario logeado" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
const logoutUser = (req, res) => {
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

};

const currentUser = (req, res) => {
    try {
        const user = req.session.user
        if (user) {

            const userDTO = new UserDTO(user)

            return res.status(200).render("current", {
                user: userDTO,
                documentTitle: "Usuario Actual",
            })
                ;
        } else {
            return res.status(401).json({ message: "No hay usuario actualmente autenticado" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const adminUser = (req, res) => {
    try {
        return res.status(200).send(`si ves este mensaje es porque sos admin`);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};
const restorePassword = async (req, res) => {
    try {
        const payload = await sessionsService.getRestore(req, res);
        if (typeof payload == 'string')
            return res.status(404).json({ status: 'error', message: payload });
        return res.redirect('/home');
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message });
    }
};

const restoreCallback = async (req, res) => {
    try {
        const payload = await sessionsService.getRestoreCallback(req, res);
        if (typeof payload == 'string')
            return res.status(404).json({ status: 'error', message: payload });
        return res.redirect('/home');
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message });
    }
};




export default {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    adminUser,
    restorePassword,
    restoreCallback
};