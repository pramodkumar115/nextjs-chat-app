import React from "react";

interface CardContentProps {
    children: any,
    className?: any
}

const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
    return <div aria-details="content" className={"p-2 font-normal text-base "+className ?? ""}>
        {children}
    </div>
}

export default CardContent;