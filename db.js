const Mongoose = require('mongoose');
const DB = 'mongodb+srv://admin:admin@tsechatroomauth.bdpd4.mongodb.net/TSechatroom?retryWrites=true&w=majority'

const connectDB = async () => {
    await Mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Database Connection Established')
}

module.exports = connectDB;
