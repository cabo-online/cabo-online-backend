import mongoose from "mongoose";

const MONGOD_URL = "mongodb://localhost:27017/cabo-online"

const connectDb = () => {
  return mongoose.connect(MONGOD_URL);
};

export { connectDb };
