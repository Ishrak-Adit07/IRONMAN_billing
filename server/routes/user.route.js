import express from "express";
import { deleteUser, loginUser, registerUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("User route is available");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.delete("/delete", deleteUser);

export default router;