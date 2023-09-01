'use client'

import Button from "@/ui-components/commons/Button"
import Textarea from "@/ui-components/commons/Textarea"
import { RiCloseLine, RiSendPlane2Fill } from 'react-icons/ri';
import { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import io, { Socket, connect } from 'socket.io-client';
import Card from "@/ui-components/commons/Card";
import CardContent from "@/ui-components/commons/CardContent";
import CardHeader from "@/ui-components/commons/CardHeader";
import CardFooter from "@/ui-components/commons/CardFooter";
import EmojiPicker, { Emoji, EmojiClickData, EmojiStyle } from "emoji-picker-react";
// let socket: Socket | null = null;

export default function Chat({ loggedInUser, chatSession, setChatSession }: { loggedInUser: any, chatSession: any, setChatSession: Function }) {
    const [messageBody, setMessageBody] = useState("");
    const [messages, setMessages] = useState<any[]>([])
    // let socket: Socket | null = null;
    const [socket, setSocket] = useState<any | null>(null);
    const messagesRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (!socket) {
            socketInitializer();
        }
    }, []);
    useEffect(() => {
        setMessages(chatSession?.messages);

    }, [chatSession]);
    const scollToBottomMessage = () => {
        const lastElement = messagesRef?.current?.lastElementChild;
        lastElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        });
    }
    useEffect(() => {
        if (chatSession && messages) {
            socket?.on("connect", () => {
                console.log("connection id", socket?.id);
            });
            socket?.on("connect_error", (err: any) => console.log("Error", err));
            // return () => {
            //     if (socket) {
            //         socket.disconnect();
            //     }
            // };
            socket?.on("server-message", (data: any) => {
                console.log("message recieved", data);
                setMessages([...messages, data.message]);
                scollToBottomMessage();
            });
            scollToBottomMessage();
        }
    }, [socket, chatSession, messages]);


    async function socketInitializer() {
        fetch("/api/controllers/ChatSession/SendMessage").finally(() => {
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
        setMessageBody("");
    }
    return <>
        {chatSession ?
            <Card className={'h-full'}>
                <CardHeader title={chatSession.participants
                    ?.filter((participant: any) => participant.emailId !== loggedInUser.emailId)
                    ?.map((participant: any) => participant.emailId).join(", ")} tools={
                        <span className="text-xl cursor-pointer" onClick={() => setChatSession(null)}><RiCloseLine /></span>
                    }>

                    </CardHeader>
                <CardContent className={'h-[calc(100%-150px)] overflow-auto'}>
                    {messages?.length > 0 ?
                        <ul ref={messagesRef}>{messages?.map((message: any, index: number) =>
                            <li className={`w-full flex ${message.author === loggedInUser.emailId ? 'justify-end' : 'justify-start'}`} key={index}>
                                <div className={`rounded-lg px-2 py-2 m-2 min-w-[5%] max-w-[75%]
                        ${message.author === loggedInUser.emailId ? 'bg-blue-200' : 'bg-blue-400'}`}
                                >
                                    <div className={"w-full break-words"} dangerouslySetInnerHTML={{ __html: message.messageBody }}></div>
                                </div>
                            </li>)}</ul>
                        : <div>
                            Please type your message
                        </div>}
                </CardContent>
                <CardFooter className={"flex gap-1 p-1"}>
                    {/* <EmojiPicker
                        onEmojiClick={(emojiData: EmojiClickData, event: MouseEvent) => setMessageBody(messageBody.concat(`<Emoji
                        unified=${emojiData.unified}
                        emojiStyle=${EmojiStyle.APPLE}
                        size={22}
                        />`))}
                        autoFocusSearch={false}
                    /> */}
                    <ReactQuill style={{ width: '100%', height: '60px', border: '1px solid lightgray' }} theme="bubble" value={messageBody} onChange={(value) => setMessageBody(value)} />
                    <Button variant="primary" size={"sm"} onClick={sendMessage}>
                        <RiSendPlane2Fill />
                    </Button>
                </CardFooter>
            </Card> :
            <Card className={'h-full'}>
                <CardContent>Please select the users on the left window to start chat</CardContent>
            </Card>
        }
    </>
}