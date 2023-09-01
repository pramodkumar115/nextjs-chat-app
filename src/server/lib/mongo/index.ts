import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export async function database(req: NextApiRequest, res: NextApiResponse, next: any) {
    console.log("url mongo", process.env.MONGO_URL)
    if (!(global as any).mongooseConnected) {
        const mongooseConnected = await mongoose.connect(process.env.MONGO_URL as string)
            .then(() => console.log("mongo db connected"))
            .catch((err) => console.log(err));
        (global as any).mongooseConnected = mongooseConnected;
    }
    await next();
}