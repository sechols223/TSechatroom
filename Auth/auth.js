const User = require('../models/user');

exports.registration = async (req,res,next) => {
    const {username, password, email}  = req.body

    if (password.length < 8) {
        return res.status(400).json({message: 'Password is less than 8 characters!'})
    }
    try {
        await User.create({
            username,
            password,
            email,
        }).then(user =>
            res.status(200).json({
                message: "User created!",
                user,
            })
        )
    } catch (err) {
        res.status(401).json({
            message: 'User not created!',
            error: error.message,
        })
    }
}