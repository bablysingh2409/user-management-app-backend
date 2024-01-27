const mongoose = require('mongoose');
require('dotenv').config();
  
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.jtqyxio.mongodb.net/?retryWrites=true&w=majority`)
    console.log('MongoDB connected');
     
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);  
    process.exit(1);
   }
};    
 
module.exports = connectDB;
  
