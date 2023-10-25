const mongoose = require("mongoose");

const getDbClient = () => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // mongoose.connection contains db
    // const { db } = mongoose.connection;
    return mongoose;
};

module.exports = getDbClient;
