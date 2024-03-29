import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = "tickets";
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4()
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

ticketSchema.plugin(mongoosePaginate);

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;