'use client'
import React, { ReactElement } from "react";

interface InputTextProps {
    onChange?: Function;
    onBlur?: Function;
    inputLabel?: string | ReactElement;
    name?: string,
    defaultValue?: any,
    value?: string,
    type?: string,
    className?: string,
    required?: boolean,
    minLength?: any,
    maxLength?: any
}

const InputText = React.forwardRef(({ onChange, onBlur, inputLabel, name, defaultValue, value, type, className, ...props }: InputTextProps, ref?: any) => {
    return <div className={"flex flex-col my-2"}>
        <span className={"p-b-2"}>{inputLabel}</span>
        <input ref={ref} name={name} type="text"
            onChange={(e: any) => {
                if (onChange) {
                    onChange(e)
                }
            }}
            onBlur={(e: any) => {
                if (onBlur) {
                    onBlur(e)
                }
            }}
            defaultValue={value}
            className={"border border-gray-500 rounded-none p-2 focus:rounded-none focus:outline-none visited:rounded-none  visited:outline-none"}
            required={props.required}
            minLength={props.minLength}
            maxLength={props.maxLength}
        />
    </div>
});


export default InputText;