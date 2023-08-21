import React from "react";

const Textarea: React.FC<{ onChange?: Function, 
    inputLabel?: string, 
    value?: any, 
    name?: string, 
    rows?: number, 
    maxLength?: number,
className?: string }> = 
({ onChange, inputLabel, value, name, rows, maxLength, className }) => {
    return <div className={"flex flex-col my-2 " + className ?? ''}>
        <span className={"p-b-2"}>{inputLabel}</span>
        <textarea rows={rows ?? 4} maxLength={maxLength ?? 4000} name={name} onChange={(e: any) => {
            if (onChange) {
                onChange(e)
            }
        }
        }
            value={value ?? ""}
            className={"border border-gray-500 rounded-none p-2 focus:rounded-none focus:outline-none visited:rounded-none  visited:outline-none"} />
    </div>
}


export default Textarea;