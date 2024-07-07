import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("User route is available");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;

//dummy
