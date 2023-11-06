import logger from "../utils/logger.utils.js";

export default class CustomError {
    static createError({ name = "Error", cause, message, code = 1 }) {
        const error = new Error(message, { cause });
        error.name = name;
        error.code = code;
        logger.error(error)
    }
}