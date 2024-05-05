import "dotenv/config";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";
import query from "../database/queries.js";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { id } = decodedToken;
      const user = await User.findById(id);
      req.user = user;
      next();
    } else {
      throw appError.create("Expired or Invalid token", 401, FAIL);
    }
  } else {
    throw appError.create("There is no token", 401, FAIL);
  }
};
