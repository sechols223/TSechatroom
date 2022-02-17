const Mongoose = require('mongoose');
const DB = process.env.MONGODB_URI;

const connectDB = async () => {
    await Mongoose.connect((DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }))
    console.log('Database Connection Established')
}

module.exports = connectDB;
