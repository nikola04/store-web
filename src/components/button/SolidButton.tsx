import { JSX, PropsWithChildren } from "react";

export function SolidButton({ title, className, children, ...props }: PropsWithChildren<JSX.IntrinsicElements['button']>){
    return <button title={title} className={`px-4 py-2 text-sm font-medium rounded-sm cursor-pointer transition-all ${className}`} {...props}>
        { children }
    </button>
}
