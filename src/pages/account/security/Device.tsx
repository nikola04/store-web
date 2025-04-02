import { useNavigate, useParams } from "react-router";
import { LOCATION_PATH } from "../../../constants/locations";
import Loader from "../../../components/loader";
import PlatformIcon from "../../../components/icons/PlatformIcon";
import { getDeviceCategory, getPlatformIconByCategory } from "../../../utils/device";
import { MdBlock, MdVerified } from "react-icons/md";
import { BackNav } from "../../../components/account/BackNav";
import { useDevice } from "../../../hooks/useDevices";
import { mergeTwoStrings } from "../../../utils/strings";
import { formatTimeDifference } from "../../../utils/time";
import { Map } from "../../../components/Map";
import { useCallback, useState } from "react";
import { logoutSession } from "../../../controllers/logoutUser";

const DEFAULT_ORIGIN = LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES;

export default function AccountDevice(){
    const { id } = useParams();
    const { device, loading, logoutDevice } = useDevice({ id });
    const [map, setMap] = useState<boolean>(false);
    const navigate = useNavigate();    

    const onSignOut = useCallback(async () => {
        try{
            if(!device) return;
            await logoutSession(device.last_session_id);
            logoutDevice();
        }catch(err){
            console.error(err);
        }
    }, [device, logoutDevice])

    if(!id) {
        navigate(LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES);
        return null;
    }
    if(loading){
        return <div className="py-8">
            <Loader size="s" />
        </div>
    }
    if(!device) return <p>Error loading device</p>

    const platform = getPlatformIconByCategory(getDeviceCategory(device?.type, device?.os));
    const thisDevice = device?.current_device == true;

    const nameString = device.name || 'Unknown Device';
    const timeString = formatTimeDifference(device.last_login_date);
    const locationString = mergeTwoStrings(device.last_login_location?.city, device.last_login_location?.country, 'Unknown Location');

    const lat = device.last_login_location?.lat, lon = device.last_login_location?.lon;

    return <div className="w-full">
        <div className='flex flex-col gap-2 px-7 pt-4 pb-6 my-4 bg-background-alt rounded-lg shadow-sm'>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <BackNav defaultOrigin={DEFAULT_ORIGIN} />
                    <h2 className="py-2 text-xl text-text-base">{ nameString }</h2>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex gap-6 items-center">
                    <div>
                        { platform && <PlatformIcon platform={platform} /> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-text-base/100">{ device.os }</p>
                            <p className="text-sm text-text-base/80">{ device.app }</p>
                            { thisDevice && <div className="flex items-center gap-1">
                                <p className="text-sm text-text-base/70">This Device</p>
                                <MdVerified size={15} className="text-primary mt-0.5"/>
                            </div> }
                        </div>
                    </div>
                </div>
                { !thisDevice && <div className="flex flex-col gap-2">
                    <p className="text-text-base text-xs font-medium uppercase">Can't recognize?</p>
                    { !device.logged_out ? <div className="flex">
                        <button className="px-3 py-1.25 bg-orange-400 hover:bg-orange-400/92 active:bg-orange-400/80 font-medium text-white text-xs border-1 rounded-lg cursor-pointer transition-all" onClick={onSignOut}>Sign out</button>
                    </div> : <div className="flex items-center gap-1">
                        <MdBlock className="text-orange-400"/>
                        <p className="text-sm text-orange-400">Logged out</p>
                    </div> }
                </div> }
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-medium uppercase">Latest activity:</p>
                        <div>
                            { device.last_login_ip && <p className="text-sm text-text-base">{ device.last_login_ip }</p> }
                            <div className="flex items-center gap-4">
                                <p className="text-sm text-text-base/80">{ locationString }</p>
                                <p className="text-xs text-text-base/80">{ timeString }</p>
                            </div>
                        </div>
                    </div>
                    { lat && lon && <div className="flex">
                        { !map ? <p className="text-sm text-primary cursor-pointer" onClick={() => setMap(true)}>Show on map</p> :
                        <div className="relative w-full max-w-96 h-64 rounded-sm overflow-clip">
                            <Map lat={lat} lon={lon} />
                        </div> }
                    </div> }
                </div>
            </div>
        </div>
    </div>;
}
