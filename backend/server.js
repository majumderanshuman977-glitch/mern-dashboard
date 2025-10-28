import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import salesRoutes from "./routes/sales.js"
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js"
import analyticsRoutes from "./routes/analytics.js"
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("Node.js Dashboard API Running");
});


// auth routes 
app.use("/api/auth", authRoutes);

//category routes
app.use("/api/categories", categoryRoutes);

//product routes
app.use("/api/products", productRoutes);

//sales routes
app.use("/api/sales", salesRoutes);

//analytics routes
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));