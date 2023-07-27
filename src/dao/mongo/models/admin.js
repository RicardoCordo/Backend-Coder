import mongoose from 'mongoose';

const collection = "Admins";

const adminSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "admin",
        require: true,
    },
});

const adminModel = mongoose.model(collection, adminSchema);
export default adminModel;