import { IconType } from "react-icons";
import { Activity } from "../types/activity";

import { LuNotebookText } from "react-icons/lu";

export const getActivityName = (activity: Activity): string => {
    if(activity === Activity.LOGIN) return "New Login";
    return "";
}

export const getActivityIcon = (activity: Activity): IconType|null => {
    if(activity === Activity.LOGIN) return LuNotebookText
    return null;
}
