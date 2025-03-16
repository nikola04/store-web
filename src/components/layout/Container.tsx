function Container({ children }: {
    children: React.ReactNode
}){
    return <div className="w-full max-w-7xl px-4 py-2">
        {children}
    </div>
}

export default Container;
