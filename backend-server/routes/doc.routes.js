import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { allDoc, createDoc, deleteDoc, oneDoc, updateDoc } from "../controllers/docController.js"

const router = express.Router()

router.get("/alldocs", verifyUser,allDoc)
router.post("/create",verifyUser, createDoc)
router.delete("/delete/:id", deleteDoc)
router.put("/update/:id", updateDoc)
router.get("/read/:id",verifyUser, oneDoc)


export default router

