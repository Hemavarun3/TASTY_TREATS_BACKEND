import mongoose from "mongoose";


const connectDb=async () => {
    try {
        mongoose.set('strictQuery',false);
        const status=await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connection established`);
    } catch (error) {
        console.log(`MongoDB Connection Failed`);
        return error
    }
}

export default connectDb;