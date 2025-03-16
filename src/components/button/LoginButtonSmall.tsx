function LoginButtonSmall({ children, title, onClick }: {
    children: React.ReactElement;
    title: string;
    onClick?: () => void
}){
    return <button title={title} onClick={onClick} className="ring-1 ring-accent/12 active:ring-2 active:ring-primary/50 rounded-md cursor-pointer transition-all">
        <div className="p-2.5">
            <div className="relative w-[22px] h-[22px]">
                { children }
            </div>
        </div>
    </button>
}

export default LoginButtonSmall
