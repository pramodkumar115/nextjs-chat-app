import React from "react";

interface InputPasswordProps {
    onChange?: Function;
    inputLabel?: string; 
    value?: any;
    name?: string;
    defaultValue?: any,
    type?: string,
    className?: string,
    required?: boolean,
    minLength?: any,
    maxLength?: any
}

const InputPassword = React.forwardRef(({onChange, inputLabel, value, name, ...props}: InputPasswordProps, ref?: any) => {
    return <div className={"flex flex-col my-2"}>
    <span className={"p-b-2"}>{inputLabel}</span>
    <input ref={ref} name={name} type="password" onChange={(e: any) => {
            if (onChange) {
                onChange(e)
            }
        }
    } 
    defaultValue={value} 
    className={"border border-gray-500 rounded-none p-2 focus:rounded-none focus:outline-none visited:rounded-none  visited:outline-none"}/>
</div>
});


export default InputPassword;