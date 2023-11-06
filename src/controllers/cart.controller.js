import cartsService from "../repositories/index.carts.js"
import productModel from "../dao/mongo/models/product.model.js"
import { v4 as uuidv4 } from 'uuid';
import ticketModel from "../dao/mongo/models/ticket.model.js"
import CartDTO from "../DTOs/cart.dto.js";
import CustomError from "../errors/CustomError.js";
import { addProductToCartErrorInfo } from "../errors/info.js";
import EErrors from "../errors/enums.js";
import logger from "../utils/logger.utils.js";
import { sendTicketEmail } from "../utils/email.utils.js";


const getCartsController = async (req, res) => {
    try {
        const carts = await cartsService.getCarts(req, res, req.query);
        const cartDTOs = carts.map(cart => new CartDTO(cart.products));
        return res.status(200).json({ status: "success", carts: cartDTOs });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getCartController = async (req, res) => {
    try {
        const cart = await cartsService.getCart(req.params.cid);
        const cartDTO = new CartDTO(cart.products);
        return res.status(200).json({ status: "success", data: cartDTO });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const createCartController = async (req, res) => {
    try {
        const createdCartId = await cartsService.createCart();
        res.status(201).json({ status: "success", data: createdCartId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const productAddCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        const productId = req.params.productId;
        const quantity = req.body.quantity;

        if (!cid) {
            return res.status(400).json({ error: 'El usuario no tiene un carrito asignado.' });
        }

        const user = req.session.user;

        const productBelongsToUser = await productModel.findOne({ _id: productId, owner: user.email });
        if (productBelongsToUser && user.role === 'premium') {
            return res.status(403).json({ error: 'Los usuarios premium no pueden agregar sus propios productos al carrito.' });
        }

        if (!productId || typeof quantity !== 'number' || quantity <= 0) {
            CustomError.createError({
                name: "Error al agregar producto al carrito",
                cause: addProductToCartErrorInfo({ productId, quantity }),
                message: "Error al intentar agregar producto al carrito",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }

        const cart = await cartsService.addToCart(cid, productId, quantity);
        return res.status(200).redirect('/cart');
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const updateCartController = async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartsService.updateCart(cid, req.body)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

}

const deleteCartController = async (req, res) => {
    try {
        const cart = await cartsService.deleteCart(req.params.cid)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

}

const deleteProductCartController = async (req, res) => {
    try {
        const cart = await cartsService.removeFromCart(req.params.cid, req.params.productId)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const calculateTotalAmount = async (cart) => {
    let totalAmount = 0;

    for (const product of cart.products) {
        const productId = product.productId;
        const quantity = product.quantity;
        const productDetails = await productModel.findById(productId);

        if (!productDetails) {
            logger.warning(`Producto con ID ${productId} no encontrado.`);
        }

        const productPrice = parseFloat(productDetails.price);
        if (!productDetails.status) {
            logger.warning(`El producto con ID ${productId} no está disponible.`);
        }

        const subtotal = productPrice * quantity;
        totalAmount += subtotal;
    }



    return totalAmount;
};

const purchaseCartController = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCart(cartId);

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío.' });
        }


        const productsToUpdate = [];

        for (const product of cart.products) {
            const productDetails = await productModel.findById(product.productId);

            if (!productDetails) {
                return res.status(400).json({ message: 'Uno o más productos en el carrito no existen.' });
            }

            if (product.quantity > productDetails.stock) {
                return res.status(400).json({ message: 'No hay suficiente stock para uno o más productos en el carrito.' });
            }

            productDetails.stock -= product.quantity;
            productsToUpdate.push(productDetails);
        }

        await Promise.all(productsToUpdate.map(product => product.save()));

        const ticketCode = uuidv4();

        const user = req.session.user;

        if (!req.session.user) {
            return res.status(400).json({ message: 'El usuario no existe.' });
        }

        const totalAmount = await calculateTotalAmount(cart);
        if (isNaN(totalAmount)) {
            logger.warning('El monto total no es un número válido.');
        }
        const ticket = new ticketModel({
            code: ticketCode,
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: user.email,
        });
        await ticket.save();
        const ticketEmail = user.email
        try {
            await sendTicketEmail(ticketEmail, ticket);
            logger.info('Correo electrónico con el ticket enviado exitosamente.');
        } catch (error) {
            logger.error('Error al enviar el correo electrónico con el ticket:', error);
        }

        cart.products = [];
        await cartsService.updateCart(cartId, cart);

        return res.status(200).redirect('/cart')
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


export default {
    getCartsController,
    getCartController,
    createCartController,
    productAddCartController,
    updateCartController,
    deleteCartController,
    deleteProductCartController,
    purchaseCartController


}