import {Server as ServerIO} from 'socket.io';
import {createServer} from 'http';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { logger, ncOptions } from '@/pages/lib/middlewares';
import { database } from '@/pages/lib/mongo';

export const config = {
    api: {
        bodyParser: false
    }
}

const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);

router.get((req: NextApiRequest, res: NextApiResponse) => {
    // if (res && res.socket && res.socket.server && res.socket.server.io) {
    //     console.log("Socket is running");
    // } else {
    //     console.log("Socket is initializing");
    //     const io = new ServerIO(res.socket.)
    // }
    const httpServer = createServer();
    const io = new ServerIO(httpServer, {
        path: "/api/controllers/ChatSession/SocketIO"
    });

    io.on("connection", (socket) => {
        console.log("IO Connected");
        // socket.emit("recieve-message", req.body);
    })
});

export default router.handler(ncOptions);