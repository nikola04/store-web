import LoginButtonSmall from "./LoginButtonSmall";

function GoogleButtonSmall({ onClick }: {
    onClick?: () => void;
}){
    return <LoginButtonSmall title="Login with Google" onClick={onClick}>
        <img src="/assets/google.png" alt="Google" className="w-full h-full" />
    </LoginButtonSmall>
}

export default GoogleButtonSmall;
