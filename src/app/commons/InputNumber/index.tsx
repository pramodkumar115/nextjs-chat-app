import React from "react";

const InputNumber:React.FC<{onChange?: Function, inputLabel?: string, value?: any, name?: string}> = ({onChange, inputLabel, value, name}) => {
    return <div className={"flex flex-col my-2"}>
    <span className={"p-b-2"}>{inputLabel}</span>
    <input name={name} type="number" onChange={(e: any) => {
            if (onChange) {
                onChange(e)
            }
        }
    } 
    defaultValue={value} 
    className={"border border-gray-500 rounded-none p-2 focus:rounded-none focus:outline-none visited:rounded-none  visited:outline-none"}/>
</div>
}


export default InputNumber;