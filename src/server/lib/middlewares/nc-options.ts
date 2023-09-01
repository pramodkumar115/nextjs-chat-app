import { NextApiRequest, NextApiResponse } from "next";

export const ncOptions = {
    onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).end(err.message);
    },
  }