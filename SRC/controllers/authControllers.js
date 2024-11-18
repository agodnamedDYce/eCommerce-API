import User from "../models/User.js";
import {signUpValidator, signInValidator } from "../validators/auth.validator.js"
import bcrypt from "bcryptjs";


export const Register = async (req, res) => {
    try {
        // Validate request data with signUpValidator
        const validatedData = signUpValidator.parse(req.body);
        
        const { firstName, lastName, userName, password, email, phoneNumber, gender, nationality, age } = validatedData;

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: `User with email ${email} already exists` });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            password: hashedPassword,
            email,
            phoneNumber,
            gender,
            nationality,
            age,
        });

        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: error.message });
    }
};

export const Login = async (req, res) => {
    try {
        // Validate request data with signInValidator
        const { loginID, password } = signInValidator.parse(req.body);

        // Check if a user with the provided loginID exists
        const user = await User.findOne({ $or: [{ email: loginID }, { userName: loginID }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // User is authenticated successfully
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: error.message });
    }
};

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate an OTP or token for password reset (for example, "123456")
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        console.log(`OTP for password reset: ${otp}`);
        res.status(200).json({ message: 'OTP sent for password reset' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Find user by email and check OTP
        const user = await User.findOne({ email, otp });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }

        // Hash the new password and save it
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null; // Clear OTP after successful reset
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
