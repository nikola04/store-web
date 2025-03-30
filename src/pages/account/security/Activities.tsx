
import { MdChevronRight, MdGppBad, MdGppGood } from "react-icons/md";
import { BackNav } from "../../../components/account/BackNav";
import Loader from "../../../components/loader";
import { LOCATION_PATH } from "../../../constants/locations";
import { useActivities } from "../../../hooks/useActivities";
import { IActivity } from "../../../types/activity";
import { getActivityName } from "../../../utils/activity";
import { useNavigate } from "react-router";
import { useMemo } from "react";

const DEFAULT_ORIGIN = LOCATION_PATH.ACCOUNT.SECURITY.PAGE;
const ORIGIN_LOCATION = LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES;

type ActivityDateGroup = {
    date: string,
    items: IActivity[]
}

export default function AccountActivities(){
    const { activities, loading } = useActivities({ limit: 30 });

    const groupsByDate = useMemo(() => { // data is already sorted on api end
        const groups: ActivityDateGroup[] = [];
        let ind = -1;
        activities.forEach(activity => {
            const date = new Date(activity.created_at).toDateString();
            if(ind === -1 || groups[ind].date != date){
                groups.push({
                    date,
                    items: []
                });
                ind++;
            }
            groups[ind].items.push(activity);
        });
        return groups;
    }, [activities]);

    if(loading){
        return <div className="py-8">
            <Loader size="s" />
        </div>
    }
    if(!activities){
        return <p>Error loading activities.</p>
    }

    return <div className="w-full">
        <div className='flex flex-col gap-5 px-7 py-4 my-4 bg-background-alt rounded-lg shadow-sm'>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <BackNav defaultOrigin={DEFAULT_ORIGIN} />
                    <h2 className="py-2 text-xl text-text-base">My Activities</h2>
                </div>
                <p className="text-sm text-text-base/70">Your activities from last 21 days.</p>
            </div>
            <div className="flex flex-col gap-4">
                { groupsByDate.map((group, ind) => <ActivityGroup key={ind} group={group} />) }
            </div>
        </div>
    </div>
}

function ActivityGroup({ group }: {
    group: ActivityDateGroup;
}){
    const userLocale = 'en-US' // navigator.language || navigator.languages[0]; // should be consistent everywhere
    const dateString = new Date(group.date).toLocaleDateString(userLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return <div className="flex flex-col">
        <p className="py-3 text-text-base/70">{ dateString }</p>
        <div className="flex flex-col">
            { group.items.map((activity, ind) => <ActivityItem key={ind} activity={activity} />) }
        </div>
    </div>
}

function ActivityItem({ activity }: {
    activity: IActivity,
}){
    const navigate = useNavigate();
    console.log(activity)
    const activitiesLocation = LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES;
    const goToActivity = () => navigate(`${activitiesLocation}/${activity.id}?origin=${ORIGIN_LOCATION}`);

    const userLocale = 'en-US' // navigator.language || navigator.languages[0]; // should be consistent everywhere
    const timeString = new Date(activity.created_at).toLocaleTimeString(userLocale, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const device = activity.device;

    return <div className="flex items-center gap-4 px-3 py-2 h-[60px] hover:bg-background active:bg-background/75 rounded-md cursor-pointer transition-all text-text-base/70" onClick={goToActivity}>
        <div className="flex justify-center basis-20">
            <p className="text-sm whitespace-nowrap">{ timeString }</p>
        </div>
        <div className="flex basis-1/2 flex-col gap-1 justify-center h-full">
            <p className="whitespace-nowrap text-sm">{ getActivityName(activity.type) } on { activity.device?.name }</p>
            <ActivityStatus approved={activity.approved} />
        </div>
        <div className="flex basis-1/2 flex-col gap-1 justify-center h-full text-sm text-text-base/70">
            <p>{ device?.name }</p>
            <p>{ device?.app }</p>
        </div>
        <div className="flex text-text-base/60">
            <MdChevronRight size={18} />
        </div>
    </div>
}

function ActivityStatus({ approved }: {
    approved: boolean|null
}){
    if(approved == true) {
        return <div className="flex mr-auto items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary-bg">
            <MdGppGood size={14} className="text-primary" />
            <p className="text-xs text-primary">Approved</p>
        </div>
    }
    if(approved == false) {
        return <div className="flex mr-auto items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-100/70">
            <MdGppBad size={14} className="text-red-500/90" />
            <p className="text-xs text-red-500/90">Not Approved</p>
        </div>
    }
    return null;
    // return <div className="flex mr-auto items-center gap-1 py-0.5 rounded-md">
    //     <MdGppMaybe size={14} className="text-text-base/60" />
    //     <p className="text-xs text-text-base/60">Not checked</p>
    // </div>;
}
