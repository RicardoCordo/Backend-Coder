import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import config from "../../../config/config.js"

const adminEmail = config.adminEmail
const productCollection = "products";
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: {
    type: String,
    unique: true,
  },
  price: Number,
  status: {
    type: Boolean,
    default: true,
    unique: false,
  },
  stock: String,
  category: String,
  owner: {
    type: String,
    default: adminEmail,
  }

});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel