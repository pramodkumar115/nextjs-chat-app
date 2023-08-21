import React from 'react';

interface RowProps {
    gap?: number,
    children: React.ReactElement | React.ReactElement[];
}

const Row: React.FC<RowProps> = ({gap, children }) => { 
    return (
        <div className={`grid grid-cols-12 gap-${gap ?? 2}`}>
            {children}
        </div>
    );
};

export default Row;
