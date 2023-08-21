'use client'

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const typeMap: any = {
    success: ['bg-green-600'],
    error: ['bg-red-800', 'text-white'],
    info: ['bg-blue-200'],
    warning: ['bg-red-100']
}

export function toast(type: 'success' | 'error' | 'info' | 'warning', message: string, placement: 'top-center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left') {
    const newElement = document.createElement("div");
    newElement.setAttribute("id", 'toast');
    document.body?.append(newElement);
    createRoot(newElement).render(<ToastComponent type={type} message={message} placement={placement}/>);
    setTimeout(() => {
        newElement.remove()
    }, 3000)
}
// type: 'success' | 'error' | 'info' | 'warning',
// message: string,
// placement: 'top-center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
function ToastComponent({type, message, placement}: {type: string, message: string, placement: string}) {
    const [classNames, setClassNames] = useState<string[]>([]);
    useEffect(() => {
        // classNames.push(typeMap[type]);
        if (placement === 'top-left') {
            classNames.push('top-0', 'justify-start');
        } else if (placement === 'top-center') {
            classNames.push('top-0', 'justify-center');
        } else if (placement === 'top-right') {
            classNames.push('top-0', 'justify-end');
        }
        else if (placement === 'bottom-left') {
            classNames.push('bottom-5', 'justify-start');
        } else if (placement === 'bottom-center') {
            classNames.push('bottom-5', 'justify-center');
        } else if (placement === 'bottom-right') {
            classNames.push('bottom-5', 'justify-end');
        }
        setClassNames(Array.from(new Set([...classNames])));
    }, []);
    return <div className={'flex absolute p-5 w-full h-100vh z-10 ' + classNames.join(" ")}>
        <div className={typeMap[type].join(" ") + " w-80 rounded-sm"}>
            <div className={"border-b p-2 flex"}>
                <span className={"font-bold flex-1 "}>{type}</span>
                <span>x</span>
            </div>
            <div className={"p-2"}>{message}</div>
            </div>
        </div>

}