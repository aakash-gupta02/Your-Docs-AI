import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import user from "../models/userModel.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(202).json("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await user.create({ username, email, password: hash });
    res.status(200).json({ message: "user created successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await user.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or Password" });
    }

    const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      User: findUser,
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(err);
  }
};
