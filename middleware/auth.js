const jwt = require("jsonwebtoken");
const jwtSecret = '09636265c1653954983dc9e3bfc1af6a162fd80a81c4d831ed1cbc73d25a7144a6a228';

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}
exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" });
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" });
                } else {
                    next();
                }
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" });
    }
};
exports.getUsers = async (req, res, next) => {
    await User.find({})
        .then(users => {
            const userFunction = users.map(user => {
                const container = {}
                container.username = user.username
                container.role = user.role
                return container
            })
            res.status(200).json({ user: userFunction })
        })
        .catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
        )
}