import mongoose from 'mongoose';

let isConnected = false; //Track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MongoDB URI not found');

    if (isConnected) return console.log('Using existing database connection');
        
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log('Database connected');

  } catch (error) {
    console.log(error)
  }

}