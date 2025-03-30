import { JSX, PropsWithChildren } from "react";
import { SolidButton } from "./SolidButton";

export function DangerButton({ title, className, children, ...props }: PropsWithChildren<JSX.IntrinsicElements['button']>){
    return <SolidButton title={title} className={`bg-red-400 hover:bg-red-500/80 active:bg-red-500/95 text-white ${className}`} {...props}>
        { children }
    </SolidButton>
}
