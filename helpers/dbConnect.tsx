import mongoose from "mongoose";

const connectDBV2 = async () => {
  const URI: any = process.env.NEXT_PUBLIC_MONGODB_URI;
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDBV2;
