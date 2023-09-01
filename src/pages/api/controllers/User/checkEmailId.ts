import { logger, ncOptions } from "@/server/lib/middlewares";
import { database } from "@/server/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import UserService from "../../../../server/services/user.services";

const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const userService = new UserService();
        console.log("req query", req?.query);
        if (req?.query?.emailId) {
            const users: any[] = await userService.searchByEmailId(req.query.emailId as string);
            if (users?.length > 0) {
                res.json({ statusCode: 500, statusMessage: "ERROR", message: "Email ID is taken. Please use different Email ID for registration" });
            } else {
                res.json({ statusCode: 200, statusMessage: "SUCCESS", message: "SUCCESS" });
            }
        } else {
            res.json({ statusCode: 500, statusMessage: "ERROR", message: "Please pass emailId" });
        }
    }
    catch (err) {
        res.json({ data: err, statusCode: 500, statusMessage: "ERROR", message: "ERROR" });
    }
});


export default router.handler(ncOptions);