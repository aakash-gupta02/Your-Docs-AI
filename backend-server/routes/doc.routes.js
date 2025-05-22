import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { createDoc, deleteDoc, updateDoc } from "../controllers/docController.js"

const router = express.Router()

router.post("/create",verifyUser, createDoc)
router.delete("/delete/:id", deleteDoc)
router.put("/update/:id", updateDoc)


export default router

