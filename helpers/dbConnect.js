import mongoose from 'mongoose';

const connectDBV2 = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI_V2);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
};

export default connectDBV2;