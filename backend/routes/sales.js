import express from "express"
import { createSale, getSalesSummary, getSales } from "../controllers/salesController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/", protect, createSale)
router.get("/", protect, getSales)
router.get("/summary", protect, getSalesSummary)



export default router;

