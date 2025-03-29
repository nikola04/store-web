import { JSX, PropsWithChildren } from "react";

export default function Section({ title, children, className, ...props }: {
    title: string;
} & PropsWithChildren<JSX.IntrinsicElements['div']>){
    return <div className="py-4">
        <h2 className="py-3 text-xl text-text-base">{ title }</h2>
        <div className={`bg-background-alt rounded-lg p-3 text-text-base/80 shadow-sm ${className}`} { ...props }>
            { children }
        </div>
    </div>
}
