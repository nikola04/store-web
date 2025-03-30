import { JSX, PropsWithChildren } from "react";
import { OutlineButton } from "./OutlineButton";

export function ConfirmOutlineButton({ title, className, children, ...props }: PropsWithChildren<JSX.IntrinsicElements['button']>){
    return <OutlineButton title={title} className={`border-primary-bg hover:bg-primary-bg/33 active:bg-primary-bg text-primary ${className}`} {...props}>
        { children }
    </OutlineButton>
}
