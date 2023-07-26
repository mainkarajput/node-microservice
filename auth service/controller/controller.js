const jwt = require('jsonwebtoken')
const User = require('../Model/userSchema')

async function login(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.json({ message: "Fill all the details" });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else {
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
}

async function register(req, res) {
    const { email, password, name } = req.body;
    if (Object.keys(req.body).length == 0) {
        return res.json({ message: "Fill all the details" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: "User already exists" });
    } else {
        const newUser = new User({
            email,
            name,
            password,
        });
        newUser.save();
        return res.json(newUser);
    }
}

module.exports = { login, register }