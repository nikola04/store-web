import { FormEvent, useCallback, useState } from "react";
import GoogleButtonSmall from "../../components/button/GoogleButtonSmall";
import FacebookButtonSmall from "../../components/button/FacebookButtonSmall";
import { useLocation, useNavigate } from "react-router";
import { verifyEmail } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";

function Login(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    const loginSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        try{
            setError("");
            if(!verifyEmail(email)) throw "Please enter valid email!";
            if(password.length <= 0) throw "Please enter valid password!";
            
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            }).then(res => res.json());
            if(res.status !== "OK") throw res.message;
            
            auth.login(res.user, res.access_token, res.csrf_token);

            const searchParams = new URLSearchParams(location.search);
            const path = searchParams.get('redirect') || '/';
            searchParams.delete('redirect');
            navigate(`${path}?${searchParams.toString()}`);
        }catch(err){
            if(typeof err === 'string') {
                setError(err);
                return;
            }
            setError('Unknown error. Please try again later.');
        }
    }, [email, password, auth, location, navigate]);

    const onGoogleLogin = () => {
        console.log("login with google")
    }
    const onFacebookLogin = () => {
        console.log("login with facebook")
    }

    const onRegister = () => navigate('/auth/register' + location.search);
    const onForgotPswd = () => navigate('/auth/forgot-password' + location.search)

    return <div className="relative w-full h-full flex">
        <div className="bg-background-alt text-text-base flex flex-col justify-center items-center px-6 py-8 flex-1/3">
            <div className="w-full max-w-[248px]">
                <h1 className="text-center text-2xl font-bold pb-4 uppercase">Login</h1>
                <form onSubmit={loginSubmit} className="flex flex-col w-full">
                    <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background rounded-md w-full my-2 px-3 py-1.5 text-sm outline-0 focus:ring-2 ring-primary-alt transition-all" />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background rounded-md w-full mt-2 mb-1 px-3 py-1.5 text-sm outline-0 focus:ring-2 ring-primary-alt transition-all" />
                    <a onClick={onForgotPswd} className="text-primary text-xs w-auto mr-auto mb-2 pt-0.5 cursor-pointer">Forgot password?</a>
                    <button title="Login" type="submit" className="bg-primary-alt my-2 px-3 py-1.5 rounded-md cursor-pointer text-sm text-text-alt">Login</button>
                </form>
                <p className="text-xs pt-2 pb-4">New here? <a onClick={onRegister} className="text-primary cursor-pointer">Create an account</a></p>
                <p className="text-sm text-center text-red-400">{ error }</p>
                <div className="bg-accent/12 w-full h-[1px] flex items-center justify-center my-5"><p className="bg-background-alt text-xs text-text-base/50 px-1 -mt-[1px]">or</p></div>
                <div className="flex justify-center items-center gap-4 py-2">
                    <GoogleButtonSmall onClick={onGoogleLogin}/>
                    <FacebookButtonSmall onClick={onFacebookLogin}/>
                </div>
            </div>
        </div>
    </div>
}

export default Login;
