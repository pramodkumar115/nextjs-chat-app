'use client'
import Card from "../commons/Card";
import CardContent from "../commons/CardContent";
import CardHeader from "../commons/CardHeader";
import Chat from "./Chat";
import UsersList from "./UsersList";

import { redirect } from "next/navigation";
import { CookiesProvider, useCookies } from "react-cookie";
import { useState } from "react";

export default function HomePage() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [chatSession, setChatSession] = useState<any | null>(null);
    // console.log("cookies", cookies);

    const createChatSession = (selectedUser: any) => {
        // console.log("selectedUser", selectedUser);
        const formData = new URLSearchParams();
        formData.append("participants", JSON.stringify([cookies.user.emailId, selectedUser.emailId]));
        fetch("api/controllers/ChatSession", {
            body: formData.toString(),
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then(async (result) => result.json())
        .then(result => setChatSession(result));
    }

    
    if (!cookies.user) {
        redirect("/login");
    } else {
        return <div className={"w-full lg:w-4/5 md:4/5 mx-auto p-4"}>
                <Card className={"p-0"}>
                    <CardContent className={"p-0"}>
                        <div className={"flex box-border"}>
                            <div className={"p-2 w-1/3 border-e border-gray-300"}>
                                <UsersList 
                                loggedInUser={cookies.user} 
                                chatSession={chatSession} 
                                createChatSession={createChatSession}/>
                            </div>
                            <div className={"p-2 w-2/3"}>
                                <Chat loggedInUser={cookies.user} chatSession={chatSession}/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
    }
}