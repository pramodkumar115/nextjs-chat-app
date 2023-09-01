import { logger, ncOptions } from "@/server/lib/middlewares";
import { database } from "@/server/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import UserService from "@/server/services/user.services";

const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const userService = new UserService();
        const users: any[] = await userService.getAllUsers();
        res.send({ data: users, statusCode: 200, statusMessage: "SUCCESS", message: "SUCCESS" });
    }
    catch (err) {
        res.json({ data: err, statusCode: 500, statusMessage: "ERROR", message: "ERROR" });
    }
});


export default router.handler(ncOptions);