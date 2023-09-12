import mongoose from 'mongoose';
import config from "../src/config/config.js";
import logger from '../src/utils/logger.js';
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info("Connected to MongoDB")
    }
    catch (err) {
        logger.error(err.message);
    };
}

export default connectDB