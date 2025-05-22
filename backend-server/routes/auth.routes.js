import express from "express"
import { login, register } from "../controllers/authController.js";

const router = express.Router()


router.post("/register", register)
router.post("/login", login)


router.get("/protected", (req, res) => {
  res.json({ message: "trying hard" });
// res.json("hello")
});

export default router