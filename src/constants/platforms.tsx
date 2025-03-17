import { BsNintendoSwitch, BsPc, BsPlaystation, BsXbox } from "react-icons/bs";

export const allowedPlatforms = ['all', 'playstation', 'nintendo', 'xbox', 'pc'];

export const platformButtons = [{
    name: "Playstation",
    logo: <BsPlaystation size={19}/>
}, {
    name: "Nintendo",
    logo: <BsNintendoSwitch size={16}/>
}, {
    name: "Xbox",
    logo: <BsXbox size={16}/>
}, {
    name: "PC",
    logo: <BsPc size={16}/>
}]
