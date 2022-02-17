const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registration = async (req,res,next) => {
    const {username, password, email}  = req.body;
    const role = 'member';
    const jwt = require('jsonwebtoken');
    const jwtsecret = '09636265c1653954983dc9e3bfc1af6a162fd80a81c4d831ed1cbc73d25a7144a6a228'

    if (password.length < 8) {
        return res.status(400).json({message: 'Password is less than 8 characters!'})
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            username,
            password: hash,
        })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: user._id, username, role: user.role },
                    jwtSecret,
                    {
                        expiresIn: maxAge, // 3hrs in sec
                    }
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                    message: "User successfully created",
                    user: user._id,
                });
            })
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });
};
exports.login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        jwtSecret,
                        {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User successfully Logged in",
                        user: user._id,
                    });
                } else {
                    res.status(400).json({ message: "Login not succesful" });
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
};
exports.update = async (req, res, next) => {
    const { role, id } = req.body;
    // Verifying if role and id is presnt
    if (role && id) {
        // Verifying if the value of role is admin
        if (role === "admin") {
            // Finds the user with the id
            await User.findById(id)
                .then((user) => {
                    // Verifies the user is not an admin
                    if (user.role !== "admin") {
                        user.role = role;
                        user.save((err) => {
                            //Monogodb error checker
                            if (err) {
                                return res
                                    .status("400")
                                    .json({ message: "An error occurred", error: err.message })
                                process.exit(1)
                            }
                            res.status("201").json({ message: "Update successful", user });
                        });
                    } else {
                        res.status(400).json({ message: "User is already an Admin" });
                    }
                })
                .catch((error) => {
                    res
                        .status(400)
                        .json({ message: "An error occurred", error: error.message });
                });
        } else {
            res.status(400).json({
                message: "Role is not admin",
            });
        }
    } else {
        res.status(400).json({ message: "Role or Id not present" });
    }
}
exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
        .then(user => user.remove())
        .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch(error =>
            res
                .status(400)
                .json({ message: "An error occurred", error: error.message })
        )
}