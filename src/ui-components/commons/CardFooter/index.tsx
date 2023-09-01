import React from "react";

interface CardFooterProps {
    children: any,
    className?: string
}

const CardFooter: React.FC<CardFooterProps> = ({children, className}) => {
    return <div aria-details="footer" className={"p-4 flex justify-end border-t border-gray-300 " + className}>
    {children}
</div>
}

export default CardFooter;