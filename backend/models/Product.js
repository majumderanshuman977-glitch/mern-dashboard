import mongoose from "mongoose";

const Products = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Product", Products);