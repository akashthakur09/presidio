const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://iamakash0218:WuU4hCeRT0Xd25Lh@cluster0.q7ww7hx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Database connection established", connect.connection.host, connect.connection.name)
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;