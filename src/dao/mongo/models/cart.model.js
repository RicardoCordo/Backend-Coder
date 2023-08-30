import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: Number, 
      }
    ]
  });

cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel