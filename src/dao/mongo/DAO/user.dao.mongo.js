import logger from "../../../utils/logger.js";
import userModel from "../models/user.model.js";

export default class UsersDAO {
    constructor() { }

    getUsers = () => {
        try {
            return userModel.find().lean();
        } catch (error) {
            logger.error (error);
        }
    };

    getUserById = (id) => {
        try {
            return userModel.findById(id);
        } catch (error) {
            logger.error (error);
        }
    };

    createUser = (user) => {
        try {
            return userModel.create(user);
        } catch (error) {
            logger.error (error);
        }
    };

    updateUser = (id, user) => {
        try {
            return userModel.findByIdAndUpdate(id, user);
        } catch (error) {
            logger.error (error);
        }
    };

    deleteUser = (id) => {
        try {
            return userModel.findByIdAndDelete(id);
        } catch (error) {
            logger.error (error);
        }
    };
}