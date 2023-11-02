import React, { useEffect, useState, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { BACKEND_BASE_URL,wsApiUrl } from '../../utils/Config';

function UserChat() {

    const [recipientdetails, setRecipientDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({});
    const [senderid, setSenderId] = useState(null);
    const [recipientid, setRecipientId] = useState(null)
    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);
    const adminId = 1
    const token = localStorage.getItem('authToken')
    const  {user_id}  = jwtDecode(token)
    const messageRef = useRef()
    const [userId, setUserId] = useState(null);



    const setUserProfileDetails = async () => {
        axios.get(`${BACKEND_BASE_URL}/api/profile-user/${adminId}/`).then((response) => {
            console.log(response.data,'recieptent response.data.user');
            if (response.status == 200) {
                setRecipientDetails(response.data.user)
                
            }
        })
    }

    const setSenderProfile = async () => {
        axios.get(`${BACKEND_BASE_URL}/api/profile-user/${user_id}/`).then((response) => {
            console.log(response.data,'sender response.data')
            if (response.status == 200) {
                setSenderDetails(response.data.user)
            }
        })
    }

    useEffect(() => {
        setUserProfileDetails()
        setSenderProfile()
    }, [])

    const setUpChat = () => {
        axios.get(`${BACKEND_BASE_URL}/chat/user-previous-chats/${senderid}/${recipientid}/`).then((response) => {
            if (response.status == 200) {
                setMessages(response.data)
            }
        })

    const client = new W3CWebSocket(`${wsApiUrl}/ws/chat/${senderid}/?${recipientid}`);
    console.log(client,'clientttttttttttttttttttttt');
    setClientState(client)

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      setClientState(client); 
    };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: dataFromServer.message,
                        sender_username: dataFromServer.senderUsername,
                    },
                ]);
            }
        };

        client.onclose = () => {
            console.log('Websocket disconnected');
        }

        return () => {
            client.close();
        };
    }

    useEffect(() => {
        if (user_id) {
            setUserId(user_id);
            console.log(userId,'usefect');
            setUserProfileDetails();
            setSenderProfile();
        }
    }, [user_id]);

    useEffect(() => {
        if (userId && adminId) {
            setSenderId(userId);
            setRecipientId(adminId);
            console.log(recipientid,senderid,'idssssssssssssssssssssssss');
            setUpChat();
        }
    }, [userId, adminId]);

    useEffect(() => {
        console.log(senderid,'senderrrrrrrrrid');
        if (senderid != null && recipientid != null) {
            setUpChat()
        }
    }, [senderid, recipientid, adminId])

   

    const onButtonClicked = () => {
        if (!clientstate) {
            console.error('WebSocket client is not initialized.');
            return;
          }

          if (messageRef.current.value.trim() == "") {
            return
          }

        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: senderdetails.username,
                receiverUsername: recipientdetails.username,
            })
        );

        messageRef.current.value = '';
    };
    // ....................................
    useEffect(() => {
        const el = document.getElementById('messages');
        el.scrollTop = el.scrollHeight;
    }, []);
    
    return (
        <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <span className="absolute text-green-500 right-0 bottom-0">
                            <svg width="20" height="20">
                                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                            </svg>
                        </span>
                        <img
                            src={recipientdetails?.profile_img}
                            alt="..."
                            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                        />
                    </div>

                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                            <span className="text-gray-700 mr-3">CarGo</span>
                        </div>
                        <span className="text-lg text-gray-600">Admin</span>
                    </div>
                </div>
            </div>
            <div
                id="messages"
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
                <div
                    id="messages"
                    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                    {

                        messages.map((message) => {
                            console.log(message,'userside msmsmsmsm');

                            if (message.sender_username == recipientdetails.username) {

                                return (
                                    <div className="chat-message">

                                        <div className="flex items-end">
                                            <div className="flex flex-col space-y-2 text-lg max-w-lg mx-2 order-2 items-start">
                                                <div>
                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                        {message.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <img
                                                src={recipientdetails?.profile_img}
                                                alt="admin profile"
                                                className="w-8 h-8 rounded-full order-1"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="chat-message">
                                        <div className="flex items-end justify-end">
                                            <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-1 items-end">
                                                <div>
                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                                                        {message.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <img
                                                src={senderdetails?.profile_img}
                                                alt='my profile'
                                                className="w-8 h-8 rounded-full order-2"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
                <div className="relative flex mb-28">
                    <input
                        ref={messageRef}
                        type="text"
                        placeholder="Write your message!"
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-2xl py-3"
                    />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button
                            onClick={(e) => onButtonClicked()}
                            type="button"
                            className="inline-flex items-center justify-center rounded-2xl px-4 py-3 transition duration-500 ease-in-out text-white bg-customColor hover:bg-blue-900 focus:outline-none"
                        >
                            <span className="font-extrabold">SEND</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-6 w-6 ml-2 transform rotate-90"
                            >
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChat