'use client'
import React from "react";
import { useCookies } from "react-cookie";
import { RiLogoutBoxLine } from "react-icons/ri";

const Header: React.FC<{title: string}> = ({title}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    return <div className={"flex bg-red-400 h-12 w-full p-2 drop-shadow-lg font-bold text-xl"}>
        <div className={"flex-1"}>
            {title}
        </div>
        <div className={"text-3xl cursor-pointer"} onClick={() => removeCookie('user')}>
            <RiLogoutBoxLine />
        </div>
</div>
}

export default Header;