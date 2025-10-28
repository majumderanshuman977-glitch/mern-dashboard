import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed,
            role
        })

        res.status(201).json({
            "message": "User created successfully"
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Restrict login to admins only
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, role: user.role },
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};