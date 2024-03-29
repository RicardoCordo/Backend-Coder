import mongoose from "mongoose";

const collection = "Users";

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	age: {
		type: Number,
	},
	password: {
		type: String,
		required: true,
	},
	cart: [{ type: mongoose.Schema.Types.String, ref: 'carts' }],
	role: {
		type: String,
		default: "user",
		required: true,
	},
	documents: [
		{
			documentType: {
				type: String
			},
			name: {
				type: String,
			},
			reference: {
				type: String,
			},
		},
	],
	last_connection: {
		type: Date,
	},
});
const userModel = mongoose.model(collection, userSchema);

export default userModel;