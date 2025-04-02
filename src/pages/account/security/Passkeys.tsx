
import { useEffect, useState } from "react";
import { BackNav } from "../../../components/account/BackNav";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { LOCATION_PATH } from "../../../constants/locations";
import { startPasskeyRegistration, verifyPasskeyRegistration } from "../../../controllers/registerPasskey";
import { IPasskey } from "../../../types/user";
import { getPasskeys } from "../../../controllers/getPasskeys";
import Loader from "../../../components/loader";
import { createPasskey } from "../../../utils/passkey";
import { GoPasskeyFill } from "react-icons/go";
import { MdDelete, MdEdit } from "react-icons/md";

const DEFAULT_ORIGIN = LOCATION_PATH.ACCOUNT.SECURITY.PAGE;

export default function AccountPasskeys(){
    const [passkeys, setPasskeys] = useState<IPasskey[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [creatingPasskey, setCreatingPasskey] = useState<boolean>(false);
    const handleRegisterPasskey = async () => {
        setCreatingPasskey(true);
        try{
            const options = await startPasskeyRegistration();
            const attestation = await createPasskey(options);
            const passkey = await verifyPasskeyRegistration(attestation);
            setPasskeys((prev) => [...prev, passkey]);
        }catch(err){
            console.error('error creating passkey:\n' + err);
        }finally{
            setCreatingPasskey(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetchPasskeys = async () => {
            try{
                const passkeys = await getPasskeys();
                setPasskeys(passkeys);
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        }
        fetchPasskeys();
    }, []);

    
    if(loading){
        return <div className="py-8">
            <Loader size="s" />
        </div>
    }

    return <div className="w-full">
        <div className='flex flex-col gap-5 px-7 py-4 my-4 bg-background-alt rounded-lg shadow-sm'>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <BackNav defaultOrigin={DEFAULT_ORIGIN} />
                    <h2 className="py-2 text-xl text-text-base">My Passkeys</h2>
                </div>
                <p className="text-sm text-text-base/70">Add, remove and modify your passkeys.</p>
            </div>
            <div className="flex">
                <PrimaryButton disabled={creatingPasskey} onClick={handleRegisterPasskey} className="font-normal">Create Passkey</PrimaryButton>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-sm text-text-base/80">Passkeys</p>
                <div className="flex flex-col">{ passkeys.map((passkey, ind) => <PasskeyItem key={ind} passkey={passkey} />)}</div>
            </div>
        </div>
    </div>
};

function PasskeyItem({ passkey }: {
    passkey: IPasskey
}){
    const nameString = passkey.name;
    const timeString = passkey.created_at.toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return <div className="flex items-center gap-4 px-4 h-14 hover:bg-background active:bg-background/75 rounded-md transition-all text-text-base/80">
        <div className="flex gap-2 items-center">
            <GoPasskeyFill size={20}/>
        </div>
        <div className="flex basis-1/3 flex-col justify-center h-full">
            <p className="font-medium text-xs text-text-base/80">Name</p>
            <p className="text-sm whitespace-nowrap">{ nameString }</p>
        </div>
        <div className="flex basis-1/3 flex-col justify-center h-full text-sm text-text-base/80">
            <p className="font-medium text-xs text-text-base/80">Created</p>
            <p>{ timeString }</p>
        </div>
        <div className="h-full flex basis-1/3 gap-4 items-center justify-end text-sm text-text-base/80">
            <div className="cursor-pointer">
                <MdEdit size={20}/>
            </div>
            <div className="cursor-pointer">
                <MdDelete size={20}/>
            </div>
        </div>
    </div>
}
