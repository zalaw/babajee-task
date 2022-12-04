const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production" ? process.env.DATABASE_URI : "mongodb://localhost:27017",
      {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
