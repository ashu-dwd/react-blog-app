const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const handleUserSignUp = async (req, res) => {
    const { email, password } = req.body;
    //console.log(req.body);
    if (!email || !password) {
        return res.json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
        return res.json({ message: "Password must be at least 6 characters" });
    }
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res.json({ message: "User already exists" });
    }
    // Handling signup logic here
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const username = email.split('@')[0];
        const result = await User.create({ username, email, password: hashedPassword });
        console.log(result);
        res.json({ message: "User created successfully" });
    } catch (error) {
        //here is error logic
        console.error(error);
        throw new Error("SignUp failed . Please try after few time.");

    }
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: "Please fill all the fields" });
    }
    // Handle login logic here
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ error: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expiration time
        )
        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error(error);
        throw new Error("Login failed . Please try after few time.");
    }
}


const handleUserUpdate = async (req, res) => {


}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleUserUpdate
}