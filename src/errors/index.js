import logger from "../utils/logger.js";
import EErrors from "./enums.js";

export default (error, req, res, next) => {
  logger.error(error.cause);
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.json({ status: "error", error: error.name });
      break;

    default:
      res.json({ status: "error", error: "Unhandled error" });
  }
};