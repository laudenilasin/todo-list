require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = connectToDB = async () => {
  
  return await mongoose.connection.openUri(`${process.env.DB_URI}`, {});
};