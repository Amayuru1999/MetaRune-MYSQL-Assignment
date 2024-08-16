import mongoose from "mongoose";

export const connectToMongoDB = (uri: string) => {
    return mongoose.connect(uri);
};