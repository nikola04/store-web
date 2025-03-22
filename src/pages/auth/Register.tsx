import { FormEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import GoogleButtonSmall from "../../components/button/GoogleButtonSmall";
import FacebookButtonSmall from "../../components/button/FacebookButtonSmall";
import { verifyEmail, verifyName, verifyPassword } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";
import { CSRF_TOKEN } from "../../constants/storage";
import { LOCATION_PATH } from "../../constants/locations";

function Register(){
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    const registerSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        try{
            if(!verifyName(name)) throw "Please enter valid name";
            if(!verifyEmail(email)) throw "Please enter valid email";
            if(password !== confirmPassword) throw "Passwords don't match"
            if(!verifyPassword(password)) throw "Please enter valid password";

            const res = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            }).then(res => res.json());
            if(res.status !== "OK") throw res.message;

            auth.login(res.user, res.access_token);
            localStorage.setItem(CSRF_TOKEN, res.csrf_token);

            const searchParams = new URLSearchParams(location.search);
            const path = searchParams.get('redirect') || '/';
            searchParams.delete('redirect');
            navigate(`${path}?${searchParams.toString()}`);
        }catch(err){
            if(typeof err === 'string') {
                setError(err);
                return;
            }
            setError('Unknown error. Please try again later.');        }
    }, [name, email, password, confirmPassword, auth, location, navigate]);

    const onGoogleLogin = () => {
        console.log("login with google")
    }
    const onFacebookLogin = () => {
        console.log("login with facebook")
    }

    const onLogin = () => navigate(LOCATION_PATH.AUTH.LOGIN + location.search);
    
    useEffect(() => {
        if(!auth.isLoggedIn) return;
        
        const searchParams = new URLSearchParams(location.search);
        const path = searchParams.get('redirect') || '/';
        searchParams.delete('redirect');
        navigate(`${path}?${searchParams.toString()}`);
    }, [auth.isLoggedIn, location.search, navigate]);

    return <div className="relative w-full h-full flex">
        <div className="bg-background-alt text-text-base flex flex-col justify-center items-center px-6 py-8 flex-1/3">
            <div className="w-full max-w-[248px]">
                <h1 className="text-center text-2xl font-bold pb-4 uppercase">Register</h1>
                <form onSubmit={registerSubmit} className="flex flex-col w-full">
                    <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-background rounded-md w-full my-2 px-3 py-1.5 text-sm outline-0 focus:ring-2 ring-primary-alt transition-all" />
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background rounded-md w-full my-2 px-3 py-1.5 text-sm outline-0 focus:ring-2 ring-primary-alt transition-all" />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background rounded-md w-full mt-2 mb-1 px-3 py-1.5 text-sm outline-0 focus:ring-2 ring-primary-alt transition-all" />
                    <input type="password" name="confirm-password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-background rounded-md w-full mt-2 mb-1 px-3 py-1.5 text-sm outline-0 focus:ring-2 ring-primary-alt transition-all" />
                    <button title="Register" type="submit" className="bg-primary-alt my-2 px-3 py-1.5 rounded-md cursor-pointer text-sm text-text-alt">Register</button>
                </form>
                <p className="text-xs pt-2 pb-4">Already registered? <a onClick={onLogin} className="text-primary cursor-pointer">Login</a></p>
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

export default Register;
