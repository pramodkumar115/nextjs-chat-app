import { sendMessage } from "@/server/services/chat.service";
import { logger, ncOptions } from "@/server/lib/middlewares";
import { database } from "@/server/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import * as http from 'http';
import WebSocket from '@/server/lib/web-socket';
import cors from "cors";
import { Server } from "socket.io";
import { NextApiResponseServerIO } from "@/types/next";


const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);
router.use(cors());

router.get( async(req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }
    const io = new Server(res.socket.server as any);
    io.on("connection", (socket) => {
        const clientId = socket.id;
        console.log("A client connected");
        console.log(`A client connected. ID: ${clientId}`);
        io.emit("message", clientId);

        // Event handler for receiving messages from the client
        socket.on("client-message", async (data) => {
            // console.log("client-message:", data);
            await sendMessage(data.chatIdentifier, data.message);
            io.emit("server-message", data);
        });

        // Event handler for client disconnections
        socket.on("disconnect", () => {
            console.log("A client disconnected.");
        });
    });
    
    res.socket.server.io = io;
    res.end();
});



router.post(async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    const { chatIdentifier, message } = req.body;
    const session = await sendMessage(chatIdentifier, message);
    // console.log("In post", res?.socket?.server?.io);
    await res?.socket?.server?.io?.emit("server-message", JSON.stringify(message));
    console.log("After post");
    res.status(201).json({response: "Testing PK"});
    // res.end();
})

export default router.handler(ncOptions);