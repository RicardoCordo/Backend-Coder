import userModel from "../models/user.model.js";

export default class UsersDAO {
    constructor() { }

    getUsers = () => {
        try {
            return userModel.find().lean();
        } catch (error) {
            throw error;
        }
    };

    getUserById = (id) => {
        try {
            return userModel.findById(id);
        } catch (error) {
            throw error;
        }
    };

    createUser = (user) => {
        try {
            return userModel.create(user);
        } catch (error) {
            throw error;
        }
    };

    updateUser = (id, user) => {
        try {
            return userModel.findByIdAndUpdate(id, user);
        } catch (error) {
            throw error;
        }
    };

    deleteUser = (id) => {
        try {
            return userModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    };
}