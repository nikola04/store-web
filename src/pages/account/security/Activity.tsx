import { useNavigate, useParams } from "react-router";
import { useActivitiy } from "../../../hooks/useActivities";
import { LOCATION_PATH } from "../../../constants/locations";
import Loader from "../../../components/loader";
import { getActivityName } from "../../../utils/activity";
import PlatformIcon from "../../../components/icons/PlatformIcon";
import { getDeviceCategory, getPlatformIconByCategory } from "../../../utils/device";
import { MdOutlineGppBad, MdOutlineGppGood, MdVerified } from "react-icons/md";
import { ConfirmOutlineButton } from "../../../components/button/ConfirmOutlineButton";
import { DeclineOutlineButton } from "../../../components/button/DeclineOutlineButton";
import { BackNav } from "../../../components/account/BackNav";
import { DangerButton } from "../../../components/button/DangerButton";

const DEFAULT_ORIGIN = LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES;

export default function AccountActivity(){
    const { id } = useParams();
    const { activity, loading, updateApproval } = useActivitiy({ id });
    const navigate = useNavigate();
    
    if(!id) {
        navigate(LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES);
        return null;
    }
    if(loading) return <Loader size="s" />
    if(!activity) return <p>Error loading activity</p>

    const setActivityApproval = (approve: boolean) => {
        updateApproval(approve);
    }

    const device = activity.device;
    const session = activity.session;

    const platform = getPlatformIconByCategory(getDeviceCategory(device?.type, device?.os));

    const info = mergeStrings(device?.os, device?.app, 'Unknown Device');
    const location = mergeStrings(session?.location?.city, session?.location?.country, 'Unkown Location');

    const userLocale = 'en-US' // navigator.language || navigator.languages[0]; // should be consistent everywhere
    const dateString = new Date(activity.created_at).toLocaleDateString(userLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const thisDevice = device?.current_device == true;

    return <div className="w-full">
        <div className='flex flex-col gap-5 px-7 py-4 my-4 bg-background-alt rounded-lg shadow-sm'>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <BackNav defaultOrigin={DEFAULT_ORIGIN} />
                    <h2 className="py-2 text-xl text-text-base">{ getActivityName(activity.type) } on { device?.name ?? 'Unknown device' }</h2>
                </div>
                <p className="text-text-base/70 text-[15px]">{ dateString }</p>
            </div>
            {/* <div>
                <p className="text-text-base/70 text-sm">Can you confirm this activity?</p>
            </div> */}
            <div className="flex gap-6 items-center">
                <div>
                    { platform && <PlatformIcon platform={platform} /> }
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="font-medium text-text-base/90">{ device?.name }</p>
                        <p className="text-sm text-text-base/70">{ info }</p>
                    </div>
                    <div>
                        { thisDevice && <div className="flex items-center gap-1">
                            <p className="text-sm text-text-base/70">This Device</p>
                            <MdVerified size={15} className="text-primary mt-0.5"/>
                        </div> }
                        <p className="text-sm text-text-base/70">{ location }</p>
                    </div>
                </div>
            </div>
            <ApproveSection isApproved={activity.approved} setApproval={setActivityApproval} />
        </div>
    </div>;
}

function ApproveSection({ isApproved, setApproval }: {
    isApproved: boolean|null
    setApproval: (approve: boolean) => void;
}){
    if(isApproved == true) return <div className="flex items-center gap-0.75 py-2">
        <MdOutlineGppGood className="text-primary" size={17} />
        <p className="text-sm text-primary font-normal">You have approved this activity.</p>
    </div>

    if(isApproved == false) return <div className="flex flex-col gap-4 py-2">
        <div className="flex items-center gap-0.75">
            <MdOutlineGppBad className="text-red-500" size={17} />
            <p className="text-sm text-red-500 font-normal">You have not approved this activity.</p>
        </div>
        <div>
            <DangerButton title="Change Password">Change Password</DangerButton>
        </div>
    </div>

    return <ConfirmationBlock setApproval={setApproval} />
}

function ConfirmationBlock({ setApproval }: {
    setApproval: (approve: boolean) => void;
}){
    return <div className="py-2">
        <p className="text-text-base/70 text-[15px]">Can you confirm this activity?</p>
        <div className="relative w-full max-w-md flex gap-2 py-2">
            <DeclineOutlineButton title="It isn't me" onClick={() => setApproval(false)}>No, it wasn't me</DeclineOutlineButton>
            <ConfirmOutlineButton title="It is my activity" onClick={() => setApproval(true)}>Yes, it is me</ConfirmOutlineButton>
        </div>
    </div>
}

const mergeStrings = (firstWord: string|undefined, secWord: string|undefined, unkownMessage: string): string => {
    let info = '';
    if(firstWord) info += firstWord;
    if(firstWord && secWord) info += ', ';
    if(secWord) info += secWord;
    if(info === '') return unkownMessage;
    return info;
}
