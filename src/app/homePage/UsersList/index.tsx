'use client'
import InputText from "@/app/commons/InputText";
import { useState } from "react";
import useSWR from 'swr'

const url = '';
const fetcher = async (url: string, currentEmailId: string) => {
    return fetch(url)
        .then(res => res.json())
        .then(results => results.data
            ?.filter((res: any) => res.emailId !== currentEmailId))
}

export default function UsersList({ loggedInUser, chatSession, createChatSession}: { loggedInUser: any, chatSession: any, createChatSession: Function }) {
    console.log("chatSession", chatSession);
    const url = '/api/controllers/User/getAllUsers';
    const { data, isLoading, error } = useSWR(url, (url: string) => fetcher(url, loggedInUser?.emailId));
    console.log("data", data);
    const [searchStr, setSearchStr] = useState("");
    const filterData = (data: any[]) => {
        if (searchStr === '') return data;
        else {
            return data.filter(d => d.emailId.toLowerCase().includes(searchStr.toLowerCase())
                || d.firstName.toLowerCase().includes(searchStr.toLowerCase())
                || d.lastName.toLowerCase().includes(searchStr.toLowerCase()))
        }
    }
    const isActive = (d: any) => {
        if (chatSession?.participants.some((p: any) => p.emailId === d.emailId)) {
            return 'bg-blue-400 text-white'
        }
    }
    return <div>
        <InputText inputLabel={"Search Users"} onChange={(e: any) => setSearchStr(e.target.value)} />
        {isLoading ?? <div>Loading</div>}
        {data && <ul>
            {filterData(data)
                ?.map((d: any) => 
                <li 
                className={"border p-2 m-1 pointer hover:bg-blue-300 hover:text-white cursor-pointer " + isActive(d)} 
                key={d.emailId} onClick={() => createChatSession(d)}>{`${d.firstName} ${d.lastName}`}</li>)}
        </ul>}
    </div>
}