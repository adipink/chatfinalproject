import React, {useEffect, useState, useContext} from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Style from "./NavBar.module.css";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import Images from "../../assets";



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

        const {account, userName, connectWallet, createAccount,error} = useContext(ChatAppContect); 
    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <Image src={Images.logo} alt="logo" width={50} height={50} />
                </div>
                <div className={Style.NavBar_box_right}>
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el,i)=>(
                           <div onClick={()=> setActive(i + 1)} key={i+1} 
                           className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}>
                            <Link className={Style.NavBar_box_right_menu_items_link}
                            href={el.link}
                            >
                                {el.menu}
                            </Link>
                           </div>
                        ))}
                    </div>

                    {/*Connect Wallet*/}
                    <div className={Style.NavBar_box_right_connect}>
                        {account == "" ? (
                            <button onClick={()=> connectWallet()}>
                              {""}
                              <span>Connect Wallet</span>  
                            </button>
                        ) : (
                           <button onClick={()=> setOpenModel(true)}>
                            {""}
                            <Image src={userName ? Images.acountName : Images.add} 
                            alt= "Account image"
                            width={20}
                            height={20}/>
                            {''}
                            <small>{userName || "Create Account"}</small>
                           </button> 
                        )}
                    </div>
                    <div className={Style.NavBar_box_right_open}
                    onClick={()=> setOpenModel(true)}>
                       <Image src={Images.open} alt="open" width={30} height={30}/>
                    </div>
                </div>
            </div>
            {/* MODEL COMPONENT */} 
            {openModel && (
                <div className={Style.modelBox}>
                    <Model openBox={setOpenModel}
                    title= "Welcome To"
                    head = "Chat"
                    info= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                    smallInfo="Please select your name"
                    image={Images.background}
                    functionName={createAccount}
                    address={account}
                    />
                </div>
            )} 
            {error == "" ? "" : <Error error={error}/>}
        </div>
    );
};

export default NavBar