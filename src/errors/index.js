import EErrors from "./enums.js";

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.json({ status: "error", error: error.name });
      break;

    default:
      res.json({ status: "error", error: "Unhandled error" });
  }
};