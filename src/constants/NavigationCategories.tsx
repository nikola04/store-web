import { BsNintendoSwitch, BsPc, BsPlaystation, BsXbox } from "react-icons/bs";
// import { CgGames } from "react-icons/cg";
// import { IoGift } from "react-icons/io5";

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
// }, {
//     name: "Giftcards",
//     logo: <IoGift size={15}/>
// }, {
//     name: "Others",
//     logo: <CgGames size={19}/>
}]