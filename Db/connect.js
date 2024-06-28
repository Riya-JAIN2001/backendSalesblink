const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URL;
// const maxRetries = 5;  
// const retryInterval = 5000;  

// const connectWithRetry = async () => {
//   let retries = 0;

//   while (retries <= maxRetries) {
//     try {
//       mongoose.set("strictQuery", false);
//       const con = await mongoose.connect(mongoURI)
//       if (con) {
//         console.log("MongoDB connected successfully");
//       }
//       return; 
//     } catch (error) {
//       retries += 1;
//       console.error(`MongoDB connection error: ${error}`);
//       console.log(`Retrying in ${retryInterval / 1000} seconds... (Attempt ${retries} of ${maxRetries})`);
//       await new Promise(res => setTimeout(res, retryInterval));
//     }
//   }

//   throw new Error('Failed to connect to MongoDB after multiple attempts');
// };

// const initializeMongoConnection = async () => {
//   await connectWithRetry();

//   mongoose.connection.on('disconnected', async () => {
//     console.error('MongoDB connection lost. Attempting to reconnect...');
//     await connectWithRetry();
//   });

//   mongoose.connection.on('error', async (error) => {
//     console.error(`MongoDB connection error: ${error}`);
//     if (error.message.includes('failed to connect to server')) {
//       await connectWithRetry();
//     }
//   });
// };

// module.exports = initializeMongoConnection;
module.exports.Connect =async ()=>{
  try {
          mongoose.set("strictQuery", false);
          const con = await mongoose.connect(mongoURI)
          if (con) {
            console.log("MongoDB connected successfully");
          }
          return; 
        } catch (error) {
          console.log(error)}

}
