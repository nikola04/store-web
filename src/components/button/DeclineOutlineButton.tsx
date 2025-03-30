import { JSX, PropsWithChildren } from "react";
import { OutlineButton } from "./OutlineButton";

export function DeclineOutlineButton({ title, className, children, ...props }: PropsWithChildren<JSX.IntrinsicElements['button']>){
    return <OutlineButton title={title} className={`border-red-200/40 hover:bg-red-200/10 active:bg-red-200/40 text-red-400 ${className}`} {...props}>
        { children }
    </OutlineButton>
}
