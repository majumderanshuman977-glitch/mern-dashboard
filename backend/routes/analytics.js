import express from "express"
import { getRevenue, getMonthlySales } from "../controllers/salesController.js"


const router = express.Router()

router.get("/revenue", getRevenue)
router.get("/monthly-sales", getMonthlySales)

export default router;