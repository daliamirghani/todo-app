const mongoose = require("mongoose");
mongoURL= "mongodb://localhost:27017/task9";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURL);
    console.log("Connection successful");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };