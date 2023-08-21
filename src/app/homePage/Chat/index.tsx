'use client'

import Button from "@/app/commons/Button"
import Textarea from "@/app/commons/Textarea"
import { useEffect, useRef, useState } from "react";
import tw from "twin.macro";

import io, { Socket, connect } from 'socket.io-client';
// let socket: Socket | null = null;

export default function Chat({ loggedInUser, chatSession }: { loggedInUser: any, chatSession: any }) {
    // console.log("Chat Session", chatSession);
    const [messageBody, setMessageBody] = useState("");
    const [messages, setMessages] = useState<any[]>([])
    // let socket: Socket | null = null;
    const [socket, setSocket] = useState<any | null>(null);
    const chatRef = useRef<HTMLUListElement | null>(null);
    useEffect(() => {

        if (!socket) {
            socketInitializer();
        }

        // socket?.on("connect_error", (err) => console.log("Error", err));
        // // return () => {
        // //     if (socket) {
        // //         socket.disconnect();
        // //     }
        // // };
        // socket?.on("server-message", (data) => {
        //     console.log("message recieved", data);
        //     setMessages([...messages, JSON.parse(data).message]);
        // });

    }, []);
    useEffect(() => {
        setMessages(chatSession?.messages);
    }, [chatSession]);
    useEffect(() => {
        if (chatSession && messages) {
            socket?.on("connect", () => {
                console.log("connection id", socket?.id);
                // socket?.emit('client-message', "testing");
            });
            socket?.on("connect_error", (err: any) => console.log("Error", err));
            // return () => {
            //     if (socket) {
            //         socket.disconnect();
            //     }
            // };
            socket?.on("server-message", (data: any) => {
                console.log("message recieved", data);
                setMessages([...messages, JSON.parse(data).message]);
            });
        }
    }, [socket, chatSession, messages]);


    async function socketInitializer() {
        fetch("/api/controllers/ChatSession/SendMessage").finally(() => {
            // socket = io();
            setSocket(io);
        });
    }

    const sendMessage = () => {
        socket?.emit('client-message', {
            chatIdentifier: chatSession.chatIdentifer,
            message: {
                author: loggedInUser.emailId,
                messageBody,
                timeStamp: new Date()
            }
        });
        // fetch("/api/controllers/ChatSession/SendMessage", {
        //     method: "post",
        //     headers: {
        //         "content-type": "application/x-www-form-urlencoded",
        //     },
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log("res", res);
        //         setMessageBody("")
        //     })
        // console.log("socket", socket);
        // socket?.emit('client-message', formData.toString());
        // fetch("/api/controllers/ChatSession/SocketIO", {
        //     method: "post",
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log("res", res);
        //         setMessageBody("")
        //     })
    }
    return <div className={'h-[calc(100vh-200px)]'}>

        <div className={'h-[calc(100%-100px)] p-2 border-b border-gray-200 overflow-auto'}>
            {messages?.length > 0 ?
                <ul ref={chatRef}>{messages?.map((message: any, index: number) =>
                    <li className={`w-full ${message.author === loggedInUser.emailId ? 'justify-start' : 'justify-end'}`} key={index}>
                        <div className= {`rounded-lg px-4 py-2 m-2 flex w-3/4 ${message.author === loggedInUser.emailId ? 'bg-blue-200' : 'bg-blue-400'}` } >{message.messageBody}
                    </div></li>)}</ul>
                : <div>
                    Please type your message
                </div>}
        </div>
        <div className={"flex gap-1"}>
            <Textarea rows={2} className={"flex-1"} value={messageBody}
                onChange={(e: any) => setMessageBody(e.target.value)} />
            <Button variant="primary" size={"sm"} onClick={sendMessage}>Send</Button>
        </div>
    </div>
}