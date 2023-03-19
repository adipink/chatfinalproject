//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "hardhat/console.sol";

interface ADNAJO {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract ChatApp {
    address public tokenAddress;
    ADNAJO public token;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        token = ADNAJO(tokenAddress);
    }

    struct Friend {
        address publicKey;
        string friendName;
    }

    struct User {
        string userName;
        Friend[] listOfFriends;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    mapping(address => User) listOfUser;
    mapping(bytes32 => Message[]) allMessages;

    function checkUserExists(address publicKey) public view returns (bool) {
        console.log(bytes(listOfUser[publicKey].userName).length > 0);
        return bytes(listOfUser[publicKey].userName).length > 0;
    }

    function createAccount(string calldata name) external {
        //console.log(msg.sender);
        require(checkUserExists(msg.sender) == false, "User already exist");
        require(bytes(name).length > 0, "User name cannot be empty");

        listOfUser[msg.sender].userName = name;

        getAllUsers.push(AllUserStruct(name, msg.sender));
    }

    function getUserName(
        address publicKey
    ) external view returns (string memory) {
        require(checkUserExists(publicKey), "User is not registered");
        return listOfUser[publicKey].userName;
    }

    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not register");
        require(
            msg.sender != friend_key,
            "Users cannot add themselves as friends"
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "these users are already friends"
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, listOfUser[msg.sender].userName);
    }

    function checkAlreadyFriends(
        address userKey,
        address friendKey
    ) internal view returns (bool) {
        if (
            listOfUser[userKey].listOfFriends.length >
            listOfUser[friendKey].listOfFriends.length
        ) {
            address temp = userKey;
            userKey = friendKey;
            friendKey = temp;
        }

        for (uint256 i = 0; i < listOfUser[userKey].listOfFriends.length; i++) {
            if (listOfUser[userKey].listOfFriends[i].publicKey == friendKey)
                return true;
        }
        return false;
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        Friend memory newFriend = Friend(friend_key, name);
        listOfUser[me].listOfFriends.push(newFriend);
    }

    function getMyFriendList() external view returns (Friend[] memory) {
        return listOfUser[msg.sender].listOfFriends;
    }

    function _getChatCode(
        address userKey,
        address friendKey
    ) internal pure returns (bytes32) {
        if (userKey < friendKey) {
            return keccak256(abi.encodePacked(userKey, friendKey));
        } else return keccak256(abi.encodePacked(friendKey, userKey));
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "You are not friends with the given user"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        Message memory newMsg = Message(msg.sender, block.timestamp, _msg);
        uint256 _amount = 10;

        // Transfer tokens from the sender to the friend
        require(
            token.transferFrom(msg.sender, friend_key, _amount),
            "Token transfer failed"
        );
        allMessages[chatCode].push(newMsg);
    }

    function readMessage(
        address friend_key
    ) external view returns (Message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUsers() public view returns (AllUserStruct[] memory) {
        return getAllUsers;
    }
}
