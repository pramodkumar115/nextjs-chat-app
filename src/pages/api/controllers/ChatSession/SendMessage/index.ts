import { sendMessage } from "@/pages/api/services/chat.service";
import { logger, ncOptions } from "@/pages/lib/middlewares";
import { database } from "@/pages/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import * as http from 'http';
import WebSocket from '@/pages/lib/web-socket';
import cors from "cors";
import { Server } from "socket.io";
import { NextApiResponseServerIO } from "@/types/next";


const router: any = createRouter<NextApiRequest, NextApiResponse>();
router.use(logger);
router.use(database);
router.use(cors());

router.get((req: NextApiRequest, res: NextApiResponseServerIO) => {
    // if (res && res.socket && res.socket.server && res.socket.server.io) {
    //     console.log("Socket is running");
    // } else {
    //     console.log("Socket is initializing");
    //     const io = new ServerIO(res.socket.)
    // }
    // console.log("Came Here for socket");
    // const httpServer = createServer();
    // const io = new ServerIO(httpServer, {
    //     path: "/api/controllers/ChatSession/SendMessage"
    // });

    // io.on("connection", (socket) => {
    //     console.log("IO Connected");
    //     // socket.emit("recieve-message", req.body);
    // })
    // console.log("Came here ==================================");
    // const httpServer = new http.Server(router);
    // const io = WebSocket.getInstance(httpServer);
    // io.on("connection", (socket) => {
    //     console.log("IO Connected");
    //     // socket.emit("recieve-message", req.body);
    // })
    // res.socket?.connect(3000, () => {
    //     console.log("connected")
    // });
    // console.log("res.socket.server.io", res.socket.server.io)
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }
    // const httpServer: http.Server = res.socket.server as any;
    const io = new Server(res.socket.server as any);
    // Event handler for client connections
    // const io = new Server(http.createServer(), {
    //          path: "/api/controllers/ChatSession/SendMessage"
    //      });

    io.on("connection", (socket) => {
        const clientId = socket.id;
        console.log("A client connected");
        console.log(`A client connected. ID: ${clientId}`);
        io.emit("message", clientId);

        // Event handler for receiving messages from the client
        socket.on("client-message", (data) => {
            console.log("client-message:", data);
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