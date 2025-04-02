import { JSX, PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import AccountHeading from "../../../components/account/Heading";
import Section from "../../../components/account/Section";
import { DeviceCategoryGroup } from "../../../types/device";
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
import { ISecurityData } from "../../../types/security";
import { getSecurityData } from "../../../controllers/getSecurityData";

const ORIGIN_LOCATION = LOCATION_PATH.ACCOUNT.SECURITY.PAGE;

export default function AccountSecurity(){
    const [securityData, setSecurityData] = useState<ISecurityData|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getSecurityData();
                setSecurityData(data);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    return <div className="flex flex-col">
        <AccountHeading title="Account Security" body="Manage your account security. Keep your account safe." />
        { securityData && !securityData.verified_email && <VerifyEmailSection /> }
        <RecentActivitiesSection />
        <SigninWaysSection securityData={securityData} loading={loading} />
        <MyDevicesSection />
        <div className="pb-8"></div>
    </div>
}

function VerifyEmailSection(){
    return <div className="flex items-center justify-between px-6 py-4 bg-red-400/25 border-0 border-red-500 rounded-lg">
        <p className="text-sm text-red-500 font-medium">Please verify your email address</p>
        <button className="px-5 py-2 bg-red-500 hover:bg-red-500/92 active:bg-red-500/80 text-xs font-medium rounded-md text-white cursor-pointer transition-all">Verify</button>
    </div>
}

function RecentActivitiesSection(){
    const { activities, loading } = useActivities({ limit: 3 });
    const navigate = useNavigate();

    const activitiesLocation = LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES;
    const onClick = (id: string) => navigate(`${activitiesLocation}/${id}?origin=${ORIGIN_LOCATION}`);
    const goActivities = () => navigate(`${activitiesLocation}?origin=${ORIGIN_LOCATION}`)

    return <Section title="Recent Activities">
        { loading ? <div className="py-2"><Loader size='s'/></div> : <>
            { activities.length === 0 ? <p className="px-4 py-2">There is no recent activity.</p> :
            <div>
                { activities.map((activity) => <ActivityItem key={activity.id} activity={activity} onClick={() => onClick(activity.id)} />) }
                <div className="bg-accent/12 w-full h-[1px] flex items-center justify-center my-2"></div>
                <div className="flex items-center justify-center gap-4 px-3 py-2 h-10 hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all" onClick={goActivities}>
                    <p className="text-sm text-primary whitespace-nowrap text-ellipsis">View Activities</p>
                </div>
            </div> }
        </> }
    </Section>;
}

function ActivityItem({ activity, onClick }: {
    activity: IActivity,
    onClick: () => void
}){
    const Icon = getActivityIcon(activity.type);

    const userLocale = 'en-US' // navigator.language || navigator.languages[0]; // should be consistent everywhere
    const dateString = activity.created_at.toLocaleDateString(userLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const titleString = `${getActivityName(activity.type)} on ${activity.device?.name ?? 'Unknown Device'}`;

    return <div className="flex items-center gap-4 px-3 py-2 h-12 hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all" onClick={onClick}>
        <div className="flex justify-center basis-7">
            { Icon && <Icon /> }
        </div>
        <div className="flex basis-1/2 flex-col justify-center h-full overflow-hidden">
            <p className="whitespace-nowrap text-[15px] text-ellipsis overflow-clip" title={titleString}>
                { titleString }
            </p>
        </div>
        <div className="flex basis-1/2 flex-col justify-center h-full text-sm text-text-base/60">
            { dateString }
        </div>
        <div className="flex text-text-base/60">
            <MdChevronRight size={18} />
        </div>
    </div>
}

function SigninWaysSection({ securityData, loading }:{
    securityData: ISecurityData|null;
    loading: boolean;
}){
    const navigate = useNavigate();
    const goTo = useCallback((page: string) => navigate(`${page}?origin=${ORIGIN_LOCATION}`), [navigate]);

    const passkeysLocation = LOCATION_PATH.ACCOUNT.SECURITY.PASSKEYS;
    const goPasskeys = () => goTo(passkeysLocation);

    const changePswdLocation = LOCATION_PATH.ACCOUNT.SECURITY.CHNG_PSWD;
    const goChangePswd = () => goTo(changePswdLocation);


    const lastPswdChangeString = securityData?.last_password_change?.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const authenticatorString = 'Off';
    const twoFactorAuthString = securityData?.enabled_2fa ? 'On' : 'Off';
    const backupCodesString = 'Off'

    return <Section title="Ways to Sign in">
        { loading ? <div className="py-2"><Loader size='s'/></div> : <>
            { !securityData ? <p className="px-4 py-2">Error loading account data.</p> : 
            <>
                <SigninWayItem name="Password" onClick={goChangePswd} icon={<MdOutlinePassword />}>
                    { (securityData && lastPswdChangeString) ? <p>Last changed: 27.3.2024.</p> : <p>Not changed yet</p> }
                </SigninWayItem>
                <SigninWayItem name="Passkeys" onClick={goPasskeys} icon={<MdKey />}>
                    { securityData && <p>{ securityData.passkeys_count } Passkey</p> }
                </SigninWayItem>
                <SigninWayItem name="Authenticator" icon={<MdQrCode />}>
                    <p>{ authenticatorString }</p>
                </SigninWayItem>
                <SigninWayItem name="2Factor Authentication" icon={<MdLock />}>
                    <p>{ twoFactorAuthString }</p>
                </SigninWayItem>
                <SigninWayItem name="Backup Codes" icon={<MdNumbers />}>
                    <p>{ backupCodesString }</p>
                </SigninWayItem>
            </> }
        </> }
    </Section>
}

function SigninWayItem({ name, icon, onClick, children }: {
    icon?: ReactNode;
    name: string;
    onClick?: () => void;
} & PropsWithChildren<JSX.IntrinsicElements['div']>){
    return <div className="flex items-center gap-4 px-3 py-2 h-12 hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all" onClick={onClick}>
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
    const devicesLocation = LOCATION_PATH.ACCOUNT.SECURITY.DEVICES;
    const onClick = () => navigate(`${devicesLocation}?origin=${ORIGIN_LOCATION}`);

    return <Section title="My Devices">
        { loading ? <div className="py-2"><Loader size='s'/></div> : <>
            { deviceCategories.length === 0 ? <p className="px-4 py-2">There are no devices.</p> :
            <div>
                { deviceCategories.map(category => <DeviceGroupItem key={category.category} group={category} /> ) }
                <div className="bg-accent/12 w-full h-[1px] flex items-center justify-center my-2"></div>
                <div className="flex items-center justify-center gap-4 px-3 py-2 h-10 hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all" onClick={onClick}>
                    <p className="text-sm text-primary whitespace-nowrap text-ellipsis">Manage Devices</p>
                </div>
            </div> }
        </> }
    </Section>
}

function DeviceGroupItem({ group }: {
    group: DeviceCategoryGroup;
}){
    const navigate = useNavigate();
    const devicesLocation = LOCATION_PATH.ACCOUNT.SECURITY.DEVICES;
    const onClick = () => navigate(`${devicesLocation}?origin=${ORIGIN_LOCATION}#${group.category}`);

    const platform = getPlatformIconByCategory(group.category);

    const titleString = `${group.size} Session${group.size > 1 ? 's' : ''} on ${group.category}${group.size > 1 ? 's' : ''}`
    const namesString = group.devices_names.join(', ');

    return <div className="flex items-center gap-4 px-3 py-2 h-[60px] hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all" onClick={onClick}>
        <div className="flex basis-7 justify-center">
            { platform && <PlatformIcon platform={platform} /> }
        </div>
        <div className="flex flex-col justify-center h-full w-full overflow-hidden">
            <p className="text-[15px] whitespace-nowrap text-ellipsis overflow-clip" title={titleString}>{ titleString }</p>
            <p className="text-sm text-text-base/60 whitespace-nowrap text-ellipsis overflow-clip" title={namesString}>{ namesString }</p>
        </div>
    </div>
}
