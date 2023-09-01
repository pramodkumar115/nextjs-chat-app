import React, { ReactElement, useState, useEffect } from 'react';

interface ColProps {
    children: string | ReactElement;
    lg?: number,
    md?: number,
    sm?: number
}

const Col: React.FC<ColProps> = ({ lg, md, sm, children }) => {
    const [flexStyle, setFlexStyle] = useState<any[]>([]);
    useEffect(() => {
        if (lg)  setFlexStyle((prevState) => [...prevState, `lg:col-span-${lg}`]);
        if (md)  setFlexStyle((prevState) => [...prevState, `md:col-span-${md}`]);
        if (sm)  setFlexStyle((prevState) => [...prevState, `sm:col-span-${sm}`]);
    }, [])
    return <div className={[...flexStyle, "py-2"].join(" ")}>
            {children}
        </div>
};

export default Col;
