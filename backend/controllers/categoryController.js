import Category from "../models/Category.js";


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};
export const getCategories = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const query = search ? { name: { $regex: search, $options: "i" } }
            : {};

        const categories = await Category.find(query)
            .select("name")
            .select("description")
            .skip(skip)
            .limit(limit)
            .sort({ name: 1 });

        const totalCategories = await Category.countDocuments(query);
        const totalPages = Math.ceil(totalCategories / limit);

        res.status(200).json({
            success: true,
            totalCategories,
            totalPages,
            currentPage: page,
            limit,
            data: categories,
        })


    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};