import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { logger, ncOptions } from "../server/lib/middlewares";
import { database } from "../server/lib/mongo";

const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);

export default router.handler(ncOptions);