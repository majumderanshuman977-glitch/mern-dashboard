import Product from "../models/Product.js";
import Category from "../models/Category.js";


export const createProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const newProduct = new Product({ name, price, category, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate("category", "name");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

export const updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { stock }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product stock", error });
    }
};
