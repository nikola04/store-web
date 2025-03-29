import { JSX, PropsWithChildren, ReactNode, useMemo } from "react";
import AccountHeading from "../../../components/account/Heading";
import Section from "../../../components/account/Section";
import { DeviceCategoryGroup } from "../../../controllers/getUserDevices";
import { getPlatformIconByCategory, groupDevicesByCategory } from "../../../utils/device";
import PlatformIcon from "../../../components/icons/PlatformIcon";
import { useNavigate } from "react-router";
import { LOCATION_PATH } from "../../../constants/locations";
import { useDevices } from "../../../hooks/useDevices";
import Loader from "../../../components/loader";
import { MdChevronRight, MdKey, MdLock, MdNumbers, MdOutlinePassword, MdQrCode } from "react-icons/md";
import { useActivities } from "../../../hooks/useActivities";
import { IActivity } from "../../../types/activity";
import { getActivityIcon, getActivityName } from "../../../utils/activity";

export default function AccountSecurity(){
    return <div className="flex flex-col">
        <AccountHeading title="Account Security" body="Manage your account security. Keep your account safe." />
        <RecentActivitiesSection />
        <SigninWaysSection />
        <MyDevicesSection />
    </div>
}

function RecentActivitiesSection(){
    const { activities, loading } = useActivities({ limit: 3 });
    return <Section title="Recent Activities">
        { loading ? <Loader size='s'/> : <>
            { activities.length === 0 ? <p className="px-4 py-2">There is no recent activity.</p> :
            <div>
                { activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />) }
                <div className="bg-accent/12 w-full h-[1px] flex items-center justify-center my-2"></div>
                <div className="flex items-center justify-center gap-4 px-3 py-2 h-10 hover:bg-background rounded-md cursor-pointer">
                    <p className="text-sm text-primary whitespace-nowrap text-ellipsis">View more Activities</p>
                </div>
            </div> }
        </> }
    </Section>;
}

function ActivityItem({ activity }: {
    activity: IActivity
}){
    const navigate = useNavigate();
    const onClick = () => navigate("");

    const Icon = getActivityIcon(activity.type);

    return <div className="flex items-center gap-4 px-3 py-2 h-12 hover:bg-background rounded-md cursor-pointer" onClick={onClick}>
        <div className="flex justify-center basis-7">
            { Icon && <Icon /> }
        </div>
        <div className="flex basis-1/2 flex-col justify-center h-full">
            <p className="whitespace-nowrap text-[15px] text-ellipsis">
                { getActivityName(activity.type) } on { activity.device?.name }
            </p>
        </div>
        <div className="flex basis-1/2 flex-col justify-center h-full text-sm text-text-base/60">
            { new Date(activity.created_at).toLocaleString() }
        </div>
        <div className="flex text-text-base/60">
            <MdChevronRight size={18} />
        </div>
    </div>
}

function SigninWaysSection(){
    return <Section title="Ways to Sign in">
        <SigninWayItem name="Password" icon={<MdOutlinePassword />}>
            <p>Last changed: 27.3.2024.</p>
        </SigninWayItem>
        <SigninWayItem name="Passkeys" icon={<MdKey />}>
            <p>1 Passkey</p>
        </SigninWayItem>
        <SigninWayItem name="Authenticator" icon={<MdQrCode />}>
            <p>On</p>
        </SigninWayItem>
        <SigninWayItem name="2Factor Authentication" icon={<MdLock />}>
            <p>Off</p>
        </SigninWayItem>
        <SigninWayItem name="Backup Codes" icon={<MdNumbers />}>
            <p>Off</p>
        </SigninWayItem>
    </Section>
}

function SigninWayItem({ name, icon, onClick, children }: {
    icon?: ReactNode;
    name: string;
    onClick?: () => void;
} & PropsWithChildren<JSX.IntrinsicElements['div']>){
    return <div className="flex items-center gap-4 px-3 py-2 h-12 hover:bg-background rounded-md cursor-pointer" onClick={onClick}>
        <div className="flex justify-center basis-7">
            { icon }
        </div>
        <div className="flex basis-1/2 flex-col justify-center h-full">
            <p className="whitespace-nowrap text-[15px] text-ellipsis">{ name }</p>
        </div>
        <div className="flex basis-1/2 flex-col justify-center h-full text-sm text-text-base/60">
            { children }
        </div>
        <div className="flex text-text-base/60">
            <MdChevronRight size={18} />
        </div>
    </div>
}

function MyDevicesSection(){
    const { devices, loading } = useDevices();
    const deviceCategories = useMemo(() => groupDevicesByCategory(devices), [devices]);

    const navigate = useNavigate();
    const onClick = () => navigate(LOCATION_PATH.ACCOUNT.SECURITY.DEVICES);

    return <Section title="My Devices">
        { loading ? <Loader size='s'/> : <>
        { deviceCategories.map(category => <DeviceGroupItem key={category.category} group={category} onClick={onClick} /> ) }
        <div className="bg-accent/12 w-full h-[1px] flex items-center justify-center my-2"></div>
        <div className="flex items-center justify-center gap-4 px-3 py-2 h-10 hover:bg-background rounded-md cursor-pointer" onClick={onClick}>
            <p className="text-sm text-primary whitespace-nowrap text-ellipsis">Manage Devices</p>
        </div>
        </> }
    </Section>
}

function DeviceGroupItem({ group, onClick }: {
    group: DeviceCategoryGroup;
    onClick: () => void;
}){

    const platform = getPlatformIconByCategory(group.category);
    const s = group.size > 1 && 's';
    return <div className="flex items-center gap-4 px-3 py-2 h-[60px] hover:bg-background rounded-md cursor-pointer" onClick={onClick}>
        <div className="flex justify-center basis-7">
            { platform && <PlatformIcon platform={platform} /> }
        </div>
        <div className="flex flex-col justify-center h-full">
            <p className="text-[15px] whitespace-nowrap text-ellipsis">{ group.size } Session{ s } on { group.category }{ s }</p>
            <p className="text-sm text-text-base/60">{ group.devices_names.join(', ') }</p>
        </div>
    </div>
}
