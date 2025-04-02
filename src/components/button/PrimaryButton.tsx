import { JSX, PropsWithChildren } from "react";
import { SolidButton } from "./SolidButton";

export function PrimaryButton({ title, className, children, ...props }: PropsWithChildren<JSX.IntrinsicElements['button']>){
    return <SolidButton title={title} className={`bg-primary hover:bg-primary/92 active:bg-primary:85 text-white ${className}`} {...props}>
        { children }
    </SolidButton>
}
