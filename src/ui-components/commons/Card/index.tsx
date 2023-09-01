import React from "react";

interface CardProps {
    children: any,
    className?: any
}

const Card: React.FC<CardProps> = ({className, children}) => {
    return <div aria-details="card" 
    className={"block bg-white border-1 w-auto border-gray-600 drop-shadow-md min-w-min rounded-sm " + className ?? ""}>
    {children}
</div>
}

export default Card;