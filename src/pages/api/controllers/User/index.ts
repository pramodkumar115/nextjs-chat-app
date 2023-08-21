import { NextApiRequest, NextApiResponse } from "next";
import UserService from "@/pages/api/services/user.services";
import { createRouter } from "next-connect"
import { logger, ncOptions } from '@/pages/lib/middlewares';
import { database } from "@/pages/lib/mongo";
import { cookies } from 'next/headers'


const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userService = new UserService();
    console.log(req.query);
    const emailId = req.query.emailId;
    const password = req.query.password;
    if (emailId && password) {
      const data = await userService.checkLogin((emailId as string), (password as string));
      if (data?.length > 0) {
        res.json({ data, statusCode: 200, statusMessage: "SUCCESS", message: "SUCCESS" })
      } else {
        res.json({ statusCode: 200, statusMessage: "SUCCESS", message: "NOT FOUND" })
      }
    } else {
      res.json({ statusCode: 200, statusMessage: "SUCCESS", message: "NOT FOUND" })
    }
  } catch (err: any) {
    console.log("err", err);
    res.json({ data: err, statusCode: 500, statusMessage: "ERROR", message: "ERROR" })
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userService = new UserService();
    const response = await userService.save(req.body);
    res.json({ message: "SUCCESS" });
  } catch (err: any) {
    res.json({ data: err, statusCode: 500, statusMessage: "ERROR", message: "ERROR" })
  }
});


export default router.handler(ncOptions);