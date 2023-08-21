import React, { useEffect, useState } from "react";

const Button: React.FC<{type?: 'button' | 'submit' | 'reset' | 'undefined', 
disabled?: any, onClick?: Function, children: any, 
className?: string, size?: 'lg' | 'sm', 
variant?: 'primary' | 'secondary' | 'default' | 'link'}> 
= ({type, disabled, onClick, children, className, size, variant}) => {
    const [classes, setClasses] = useState<string>("");
    useEffect(() => {
        const cls: string[] = [];
        const sz = size ?? 'lg';
        const vr = variant ?? 'primary';
        if (sz === 'lg') {
            cls.push('px-8', 'py-4', "text-lg");
        }
        if (sz === 'sm') {
            cls.push('px-4', 'py-2', "text-sm");
        }
        
        if (variant === 'primary') {
            if (!disabled) {
                cls.push('hover:bg-blue-950');
                }
 else {
    cls.push('')
 }            cls.push('shadow-sm','border', 'border-solid', 'border-blue-900', 'bg-blue-900', 'text-white', 'font-bold');
        }
        if (variant === 'secondary') {
            cls.push('border-black', 'border', 'border-solid', 'bg-white', 'text-black', 'font-bold');
        }
        if (variant === 'default') {
            cls.push('bg-white', 'text-black', 'font-bold');
        } 
        if (variant === 'link') {
            cls.push('bg-white', 'text-black', 'underline', 'font-bold');
        }
        if (disabled) {

        }
        setClasses(cls.join(" "));
    }, []);

    const typeVal: 'button' | 'submit' | 'reset' | 'undefined' = type ?? 'button';
    return <div className="flex flex-col justify-center">
        <button disabled={disabled ?? false} type={typeVal as any} className={className ? classes + " " + className : classes} onClick={(e) => onClick ? onClick(e) : ''}>{children}</button>
        </div>
}

export default Button;