import React, {useEffect, useState, useContext} from 'react'
//import Image from 'next/image';
import Link from 'next/link';

import Style from "./NavBar.module.css";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";



const NavBar=()=> {
    const menuItems = [
        {
            menu: "All Users",
            link: "alluser",
        },
        {
            menu: "CHAT",
            link: "/",
        },
        {
            menu: "CONTACT",
            link: "/",
        },
        {
            menu: "SETTING",
            link: "/",
        },
        {
            menu: "FAQS",
            link: "/",
        },
        {
            menu: "Terms Of Use",
            link: "/",
        },
    ]

     //UseState
        const [active, setActive] = useState(2);
        const [first, setfirst] = useState(false);
        const [openModel, setOpenModel] = useState(false);

        const {account, userName, connectWallet} = useContext(ChatAppContect); 
    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                   
                </div>
                <div className={Style.NavBar_box_right}>
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el,i)=>(
                           <div onClick={()=> setActive(i + 1)} key={i+1} 
                           className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}}`}>
                            <Link className={Style.NavBar_box_right_menu_items_link}
                            href={el.link}
                            >
                                {el.menu}
                            </Link>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar