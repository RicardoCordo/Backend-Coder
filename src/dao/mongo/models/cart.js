import mongoose from "mongoose";
import productModel from "./product.js";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: productModel }],
    quantity: {
        type: Number,
        default: 1
    }
    
});

cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel