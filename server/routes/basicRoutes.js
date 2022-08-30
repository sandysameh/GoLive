import express from "express";
import {
  createUser,
  login,
  logout,
  auth,
  createLive,
  getLives,
  getName,
} from "../controllers/usersControl.js";
const router = express.Router();

//Start Adding ROutes
router.post("/signUp", createUser);
router.put("/login", login);
router.get("/logout", auth, logout);
router.get("/golive", auth, createLive);
router.get("/getLives", auth, getLives);
router.get("/getName", auth, getName);

export default router;
