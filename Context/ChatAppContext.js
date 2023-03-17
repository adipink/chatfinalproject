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

    //Fetch Data Time Of Page Load
    const fetchData = async()=>{
        try {
            //Get Contract
            const contract = await connectingWithContract();
            //Get Account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //Get User Name
            const userName = await contract.getUserName(connectAccount);
            setUserName(userName);
            //Get My Friend List
            const friendLists = await contract.getMyFriendList();
            setFriendList(friendLists);
            //Get AllApp User List
            const userList = await contract.getAllAppUser();
            setUserList(userList);
        } catch (error) {
            setError("Please Install and connect your wallet")
        }
    };

    useEffect(()=>{
       fetchData(); 
    }, []);

    //Read Message
    const readMessage = async(friendAddress)=>{
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("Currently You Have No Message")
        }
    }

    //Creat Account
    const createAccount = async({name,accountAddress})=>{
        try {
           if(name || accountAddress)
            return setError("Name And Account Cannot Be Empty") 

            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
         setError("Error while creating your account please reload the browser");   
        }
    }

    //Add Your Friend
    const addFriends = async(name, accountAddress)=>{
        try {
            if(name || accountAddress)
            return setError("Please provide data");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress,name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();            

        } catch (error) {
            setError("Something went wrong while adding friends, try again")
        }
    }

    //Send Message
    const sendMessage = async({msg, address})=>{
        try {
            if(msg || address) return setError("Please Type Your Message");

            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
             setLoading(false);
             window.location.reload();
        } catch (error) {
            setError("Please reload and try again")
        }
    }

    //Read Info
    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUserName(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }

    return(
        <ChatAppContect.Provider 
        value={{
            readMessage,
            createAccount, 
            addFriends,
            sendMessage, 
            readUser,
            connectWallet,
            CheckIfWalletConnected,
            account,
            userName,
            listOfFriend,
            friendMsg,
            loading,
            usersList,
            error}}>
            {children}
        </ChatAppContect.Provider>
    )
}
