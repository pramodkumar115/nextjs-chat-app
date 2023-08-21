import { logger, ncOptions } from "@/pages/lib/middlewares";
import { database } from "@/pages/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getChatSession } from "../../services/chat.service";


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