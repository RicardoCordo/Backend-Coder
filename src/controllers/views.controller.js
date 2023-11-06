import productModel from "../dao/mongo/models/product.model.js";
import usersService from "../repositories/index.users.js";
import viewsService from "../repositories/index.views.js";

const loginController = async (req, res) => {
    try {

        const payload = await viewsService.getLogin();

        if (typeof payload === 'string') {
            return await res.status(404).json({ status: 'error', message: payload });
        }

        return await res.status(200).render('login', payload);
    } catch (error) {
        return await res.status(500).json({ status: 'error', error: err.message });
    }
};


const registerController = async (req, res) => {
    try {

        const payload = await viewsService.getRegister();

        if (typeof payload === 'string') {
            return await res.status(404).json({ status: 'error', message: payload });
        }

        return await res.status(200).render('register', payload);
    } catch (error) {
        return await res.status(500).json({ status: 'error', error: err.message });
    }
};



const getHomeController = async (req, res) => {
    try {
        return await res.status(200).render('home', {
            user: req.session.user,
            documentTitle: "Home",
        });
    } catch (error) {
        return await res.status(500).json({ error: err.message });
    };
};

const getProductsViewsController = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, payload, ...rest } =
            await productModel.paginate({}, { page, limit: 5, lean: true });
        const products = docs;
        const user = req.session.user || null;
        const cart = user ? user.cart : null;
        res.render("products", {
            products,
            page: rest.page,
            payload: products,
            totalPages,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            user: user,
            cart: cart,

        });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};



const getChatViewsController = async (req, res) => {
    try {
        return res.status(200).render('chat', {
            documentTitle: "Chat",
        });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    };
};

const getCartViewsController = async (req, res) => {
    try {
        const user = req.session.user;
        const cartData = await viewsService.getCart(user.cart);

        if (!cartData) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const transformedCartData = {
            _id: cartData._id,
            products: cartData.products.map(product => ({
                _id: product.productId._id,
                title: product.productId.title,
                quantity: product.quantity
            })),
            __v: cartData.__v
        };

        const payload = {
            user: user,
            cart: transformedCartData,  
            documentTitle: 'cart',
        };

        res.render('cart', { data: payload }); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getRealtimeProductsController = async (req, res) => {
    try {
        return res.status(200).render("realTimeProducts", {
            documentTitle: "Socket",
        });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    };
};

const getCurrentController = async (req, res) => {
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
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};

const getRestoreController = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) return res.redirect('/home');
        const payload = await viewsService.getRestore(req, res);
        if (typeof payload == 'string')
            return res.status(404).json({ status: 'error', message: payload });
        return res.status(200).render('restore', payload);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: err.message });
    }
};
const getAdminView = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.render('admin', { users });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};

export default {
    loginController,
    registerController,
    getHomeController,
    getProductsViewsController,
    getChatViewsController,
    getCartViewsController,
    getRealtimeProductsController,
    getCurrentController,
    getRestoreController,
    getAdminView

}