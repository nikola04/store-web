import { useMemo } from "react";
import { BackNav } from "../../../components/account/BackNav";
import Loader from "../../../components/loader";
import { LOCATION_PATH } from "../../../constants/locations";
import { useDevices } from "../../../hooks/useDevices"
import { getPlatformIconByCategory, groupDevicesByCategory } from "../../../utils/device";
import { Device, DeviceCategoryGroup } from "../../../types/device";
import { MdBlock, MdCheck, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router";
import { mergeTwoStrings } from "../../../utils/strings";
import PlatformIcon from "../../../components/icons/PlatformIcon";
import { formatTimeDifference } from "../../../utils/time";

const DEFAULT_ORIGIN = LOCATION_PATH.ACCOUNT.SECURITY.PAGE;
const ORIGIN_LOCATION = LOCATION_PATH.ACCOUNT.SECURITY.DEVICES;

export default function AccountDevices(){
    const { devices, loading } = useDevices();
    const deviceCategories = useMemo(() => groupDevicesByCategory(devices), [devices]);

    if(loading){
        return <div className="py-8">
            <Loader size="s" />
        </div>
    }
    if(!devices){
        return <p>Error loading devices.</p>
    }

    return <div className="w-full">
        <div className='flex flex-col gap-5 px-7 py-4 my-4 bg-background-alt rounded-lg shadow-sm'>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <BackNav defaultOrigin={DEFAULT_ORIGIN} />
                    <h2 className="py-2 text-xl text-text-base">My Devices</h2>
                </div>
                <p className="text-sm text-text-base/80">Devices on which you have been logged in at least once.</p>
            </div>
            <div className="flex flex-col gap-4">
                { deviceCategories.map((category, ind) => <DeviceCategory key={ind} category={category} />)}
            </div>
        </div>
    </div>
}

function DeviceCategory({ category }: {
    category: DeviceCategoryGroup
}){
    const platform = getPlatformIconByCategory(category.category);
    return <div className="flex flex-col gap-4" id={category.category}>
        <div className="flex gap-1">
            <div className="flex items-center basis-10">
                { platform && <PlatformIcon platform={platform} /> }
            </div>
            <div className="flex basis-full flex-col">
                <p className="text-text-base/80">{ category.category }s</p>
                <p className="text-text-base/70 text-sm">{ category.size } sessions</p>
            </div>
        </div>
        <div className="flex flex-col">
            { category.devices.map((device, ind) => <DeviceItem key={ind} ind={ind+1} device={device} />) }
        </div>
    </div>
}

function DeviceItem({ device, ind }: {
    device: Device,
    ind: number
}){
    const navigate = useNavigate();

    const devicesLocation = LOCATION_PATH.ACCOUNT.SECURITY.DEVICES;
    const goToDevice = () => navigate(`${devicesLocation}/${device.id}?origin=${ORIGIN_LOCATION}`);

    const deviceName = device.name || 'Unknown Device';
    const deviceApp = device.app || 'Unknown App';

    const timeString = device.current_device ? 'Now' : formatTimeDifference(device.last_login_date);
    const locationString = mergeTwoStrings(device.last_login_location?.city, device.last_login_location?.country, 'Unknown Location');

    return <div className="flex items-center gap-4 px-3 py-2 h-[60px] hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all text-text-base/80" onClick={goToDevice}>
        <div className="flex basis-1">
            <p className="text-sm text-text-base/80">{ind}.</p>
        </div>
        <div className="flex basis-1/3 gap-2 items-center">
            <p className="text-sm whitespace-nowrap">{ deviceName }</p>
            { device.current_device && <div className="flex items-center gap-0.5 mr-auto px-1.5 py-0.25 rounded-md bg-primary">
                <MdCheck size={13} className="text-white"/>
                <p className="text-xs text-white whitespace-nowrap">This Device</p>
            </div> }
        </div>
        <div className="flex basis-1/3 flex-col gap-1 justify-center h-full">
            <p className="whitespace-nowrap text-sm">{ deviceApp }</p>
            { device.logged_out && <div className="flex items-center gap-1">
                <MdBlock size={14} />
                <p className="text-xs">Logged out</p>
            </div> }
        </div>
        <div className="flex basis-1/3 flex-col gap-1 justify-center h-full text-sm text-text-base/80">
            <p>{ timeString }</p>
            <p>{ locationString }</p>
        </div>
        <div className="flex text-text-base/80">
            <MdChevronRight size={18} />
        </div>
    </div>
}
