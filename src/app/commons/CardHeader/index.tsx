import React from "react";

interface CardHeaderProps {
    children?: any,
    title?: React.ReactElement | string,
    tools?: React.ReactElement | string
}

const CardHeader: React.FC<CardHeaderProps> = ({title, tools, children}) => {
    return <div className={"flex items-stretch"}>
            <div aria-details="header" className={"flex-1 p-2 font-bold text-xl"}>{title}</div>
            <div className={"p-2"}>{tools}</div>
        </div>
}

export default CardHeader;