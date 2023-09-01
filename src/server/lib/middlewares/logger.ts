import { NextApiRequest, NextApiResponse } from "next";

export default async function logger(req: NextApiRequest, res: NextApiResponse, next: any) {
    const startTime = Date.now();
    await next();
    const endTime = Date.now();

    console.log(`Request took ${(endTime - startTime)} milli seconds`);
}