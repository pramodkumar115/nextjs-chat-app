import React from "react";

const Header: React.FC<{title: string}> = ({title}) => {
    return <div className={"bg-red-400 h-12 w-full p-2 drop-shadow-lg font-bold text-xl"}>
    {title}
</div>
}

export default Header;