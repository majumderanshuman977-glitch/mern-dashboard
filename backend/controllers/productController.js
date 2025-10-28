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
        // ✅ Get query parameters
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const category = req.query.category || "All";

        // ✅ Build MongoDB query
        const query = {};

        // Filter by name (case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter by category if provided
        if (category !== "All") {
            query.category = category; // category should be an ObjectId or string id
        }


        const skip = (page - 1) * limit;


        const [products, total] = await Promise.all([
            Product.find(query)
                .populate("category", "name")
                .skip(skip)
                .limit(limit),
            Product.countDocuments(query),
        ]);

        const totalPages = Math.ceil(total / limit);


        res.status(200).json({
            success: true,
            data: products,
            currentPage: page,
            totalPages,
            totalItems: total,
        });
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
