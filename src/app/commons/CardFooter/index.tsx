import React from "react";

interface CardFooterProps {
    children: any,
    className?: string
}

const CardFooter: React.FC<CardFooterProps> = ({children, className}) => {
    return <div aria-details="footer" className={"p-2 flex justify-end " + className}>
    {children}
</div>
}

export default CardFooter;