import mongoose from "mongoose";

const productCollection = "products";
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: String,
    stock: String,
    category: String,
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel