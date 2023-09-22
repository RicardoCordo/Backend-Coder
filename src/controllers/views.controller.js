import productModel from "../dao/mongo/models/product.model.js";
import viewsService from "../repositories/index.views.js";


const getHomeController = async (req, res) => {
    try {
        return await res.status(200).render("home", {
            user: req.session.user,
            documentTitle: "Home",
        });
    } catch (err) {
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
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getChatViewsController = async (req, res) => {
    try {
        return res.status(200).render("chat", {
            documentTitle: "Chat",
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
};

const getRealtimeProductsController = async (req, res) => {
    try {
        return res.status(200).render("realTimeProducts", {
            documentTitle: "Socket",
        });
    } catch (err) {
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
    } catch (err) {
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
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export default {
    getHomeController,
    getProductsViewsController,
    getChatViewsController,
    getRealtimeProductsController,
    getCurrentController,
    getRestoreController

}