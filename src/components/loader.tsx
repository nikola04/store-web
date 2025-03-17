function Loader(){
    return <div className="flex justify-center items-center h-screen">
        <span style={{
                width: "48px",
                height: "48px",
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
