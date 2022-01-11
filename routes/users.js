import express from "express";
import {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.js";
const users = express.Router();

users.route("/").get(getAllUsers).post(createUser);
users
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser);

export default users;