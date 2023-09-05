import UserDTO from "../DTOs/user.dto.js"
import cartsService from "../repositories/index.carts.js";
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
        const user = new UserDTO({
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: cartId,
        });
        req.session.user = user;
        console.log(user); // mas que nada para ver el id del carrito
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


export default {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    adminUser
};