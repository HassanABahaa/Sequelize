import { Router } from "express";
import {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  filterUserByChar,
  filterByAge,
  oldestUser,
  searchById,
  allUsers,
} from "./user.controller.js";

const router = Router();

// signUp
router.post("/signup", signUp);

// signIn
router.post("/signin", signIn);

// update
router.patch("/:id", updateUser);

// delete
router.delete("/:id", deleteUser);

// get users name start with "a" and age lt 30
router.get("/filterbychar", filterUserByChar);

// get users age between 22 and 30
router.get("/filterbyage", filterByAge);

// get the 3 oldest users
router.get("/oldestuser", oldestUser);

// search for users by list of ids
router.get("/userbyid", searchById);

// get all user
router.get("/", allUsers);

export default router;
