import mongoose from 'mongoose';
import config from "../src/config/config.js";
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB")
    }
    catch (err) {
        console.log(err.message);
    };
}

export default connectDB