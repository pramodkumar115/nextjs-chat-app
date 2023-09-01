'use client'
import Chat from "@/ui-components/Chat";
import UsersList from "@/ui-components/UsersList";

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
        return <div className={"w-full lg:w-4/5 md:4/5 mx-auto"}>

            <div className={"flex box-border h-[calc(100vh-200px)]"}>
                <div className={"md:block flex-1 border-e border-gray-300 hidden"}>
                    <UsersList
                        loggedInUser={cookies.user}
                        chatSession={chatSession}
                        createChatSession={createChatSession} />
                </div>
                <div className={"flex-3 w-full"}>
                    <Chat loggedInUser={cookies.user} chatSession={chatSession} setChatSession={setChatSession}/>
                </div>
            </div>

        </div>
    }
}