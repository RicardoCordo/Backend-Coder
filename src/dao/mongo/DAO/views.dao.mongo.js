import logger from "../../../utils/logger.utils.js";
import cartModel from "../models/cart.model.js";



export class ViewsDAO {
    constructor() { }


    async getLoginDao() {
		try {
			const payload = {
				documentTitle: 'login',
			};
			return payload;
		} catch (error) {
            logger.error(error);
		}
	}

    async getRegisterDao() {
		try {
			const payload = {
				documentTitle: 'register',
			};
			return payload;
		} catch (error) {
			logger.error(error);
		}
	}

    async getCartDao(cid) {
        try {
            const cart = await cartModel.findById(cid).populate('products.productId');
            return cart;
        } catch (error) {
            logger.error(error);
        }
    }

    async getRestoreDao(req, res) {
        try {
            const { user } = req.session;
            const payload = {
                user,
                documentTitle: 'Restore',
            };
            return payload;
        } catch (error) {
            logger.error(error);;
        }
    }
}


