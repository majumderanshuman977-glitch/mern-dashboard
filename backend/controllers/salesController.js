import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import User from "../models/User.js";



export const createSale = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log(req.body);
        const foundProduct = await Product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        const sale = await Sale.create({
            product: foundProduct._id,
            quantity,
            totalPrice: foundProduct.price * quantity,
            user: req.user.id
        });

        foundProduct.stock -= quantity;
        await foundProduct.save();

        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSales = async (req, res) => {
    try {
        const sales = await Sale.find({}).populate("product", "name");
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSalesSummary = async (req, res) => {

    try {
        const sales = await Sale.aggregate([
            {
                $group: {
                    _id: "$product",
                    totalRevenue: { $sum: "$totalPrice" },
                    totalSold: { $sum: "$quantity" }
                },
            },
        ]);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getRevenue = async (req, res) => {
    try {
        const total = await Sale.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
        ]);
        const totalRevenue = total[0]?.totalRevenue || 0;
        const totalOrders = await Sale.countDocuments();
        const totalProducts = await Product.countDocuments()

        res.json({
            totalRevenue,
            totalOrders,
            totalProducts
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMonthlySales = async (req, res) => {
    try {
        const monthly = await Sale.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalSales: { $sum: "$totalPrice" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const formattedMonthly = monthly.map(item => ({
            month: monthNames[item._id - 1],
            totalSales: item.totalSales
        }));
        res.json(formattedMonthly);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



