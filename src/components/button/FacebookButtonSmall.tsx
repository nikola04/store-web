import LoginButtonSmall from "./LoginButtonSmall";

function FacebookButtonSmall({ onClick }: {
    onClick?: () => void;
}){
    return <LoginButtonSmall title="Login with Facebook" onClick={onClick}>
        <img src="/assets/facebook.png" alt="Facebook" className="w-full h-full" />
    </LoginButtonSmall>
}

export default FacebookButtonSmall;
