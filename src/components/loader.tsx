function Loader({ size = 'm' }: {
    size?: 's'|'m'|'lg'
}){
    let width = 48, height = 48;
    if(size === 's') {
        width = 32;
        height = 32;
    }else if(size == 'lg'){
        width = 56;
        height = 56;
    }
    return <div className="flex justify-center items-center">
        <span style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: "50%",
                position: "relative",
                animation: "rotate 1s linear infinite",
            }}
        >
            <span style={{
                    content: '""',
                    boxSizing: "border-box",
                    position: "absolute",
                    inset: "0px",
                    borderRadius: "50%",
                    border: "5px solid #FFF",
                    animation: "prixClipFix 2s linear infinite",
                }}
            ></span>
            <span style={{
                    content: '""',
                    boxSizing: "border-box",
                    position: "absolute",
                    inset: "0px",
                    borderRadius: "50%",
                    border: "5px solid var(--color-primary)",
                    transform: "rotate3d(90, 90, 0, 180deg)",
                    animation: "prixClipFix 2s linear infinite",
                }}
            ></span>
        </span>
    </div>
}

export default Loader;
