import express from "express";
import { createProduct, getProducts, updateProductStock } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.put("/:id/stock", protect, updateProductStock);


export default router;