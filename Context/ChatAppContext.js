import React , {useState, useEffect} from "react";
import { useRouter} from "next/router";

import { CheckIfWalletConnected, connectWallet, connectingWithContract, converTime} from "../Utils/apiFeature";

export const ChatAppContect = React.createContext();

export const ChatAppProvider = ({children})=> {
    //UseState
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [listOfFriend, setFriendList] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersList, setUserList] = useState([]);
    const [error, setError] = useState("");

    //Chat User Data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();
    return(
        <ChatAppContect.Provider value={{}}>
            {children}
        </ChatAppContect.Provider>
    )
}