import { JSX, PropsWithChildren } from "react";

function NavButton({ children, active = false, className, ...props }: {
    active?: boolean;
} & PropsWithChildren<JSX.IntrinsicElements["button"]>) {
    return <div className={`relative bg-background hover:bg-primary transition-all rounded-full text-text-base hover:text-text-alt ${active && '!bg-primary'}`}>
            <button {...props} className={`p-2.25 rounded-full cursor-pointer hover:text-text-alt active:text-text-alt ${className} ${active && '!text-text-alt'}`}>
                {children}
            </button>
        </div>;
}

export default NavButton;
