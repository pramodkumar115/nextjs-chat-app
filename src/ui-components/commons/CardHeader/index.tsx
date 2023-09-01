import React from "react";

interface CardHeaderProps {
    children?: any,
    title?: React.ReactElement | string,
    tools?: React.ReactElement | string
}

const CardHeader: React.FC<CardHeaderProps> = ({title, tools, children}) => {
    return <div className={"flex items-stretch border-b border-gray-300 p-4"}>
            <div aria-details="header" className={"flex-1 font-bold text-xl"}>{title}</div>
            <div>{tools}</div>
        </div>
}

export default CardHeader;