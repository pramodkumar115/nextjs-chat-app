import { logger, ncOptions } from "@/server/lib/middlewares";
import { database } from "@/server/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getChatSession } from "../../../../server/services/chat.service";


const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("request", req.body);
    const participants = JSON.parse(req.body.participants);
    const session = await getChatSession(participants);
    res.json(session);
})

export default router.handler(ncOptions);