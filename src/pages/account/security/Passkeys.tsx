
import { BackNav } from "../../../components/account/BackNav";
import { LOCATION_PATH } from "../../../constants/locations";

const DEFAULT_ORIGIN = LOCATION_PATH.ACCOUNT.SECURITY.PAGE;
// const ORIGIN_LOCATION = LOCATION_PATH.ACCOUNT.SECURITY.PASSKEYS;

export default function AccountPasskeys(){
    // if(loading){
    //     return <div className="py-8">
    //         <Loader size="s" />
    //     </div>
    // }
    // if(!passkeys){
    //     return <p>Error loading passkeys.</p>
    // }

    return <div className="w-full">
        <div className='flex flex-col gap-5 px-7 py-4 my-4 bg-background-alt rounded-lg shadow-sm'>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <BackNav defaultOrigin={DEFAULT_ORIGIN} />
                    <h2 className="py-2 text-xl text-text-base">My Passkeys</h2>
                </div>
                <p className="text-sm text-text-base/70">Your passkeys.</p>
            </div>
            <div className="flex flex-col gap-4">
            </div>
        </div>
    </div>
};
