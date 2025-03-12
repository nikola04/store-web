import { JSX, PropsWithoutRef } from "react";

function NavButton({ children, className, ...props }: {
    children: React.ReactNode;
    className?: string;
} & PropsWithoutRef<JSX.IntrinsicElements["button"]>) {
    return <div className="hover:bg-background/80 active:bg-background/100 transition-all rounded-full">
        <button {...props} className={`p-2 rounded-full cursor-pointer ${className}`}>
            {children}
        </button>
    </div>;

}

export default NavButton;