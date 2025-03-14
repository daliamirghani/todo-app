const mongoose = require("mongoose");
process.env.MONGO_URL = "mongodb://localhost:27017/task9";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection successful");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };