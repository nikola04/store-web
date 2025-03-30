import { JSX, PropsWithChildren } from "react";

export function OutlineButton({ title, className, children, ...props }: PropsWithChildren<JSX.IntrinsicElements['button']>){
    return <button title={title} className={`w-full px-4 py-1 border-2 text-sm font-medium rounded-sm cursor-pointer transition-all ${className}`} {...props}>
        { children }
    </button>
}
