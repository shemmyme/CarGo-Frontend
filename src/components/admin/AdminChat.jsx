import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import jwtDecode from 'jwt-decode';
import { useRef } from 'react';
import Chatlist from './Chatlist'
import { BACKEND_BASE_URL,wsApiUrl } from '../../utils/Config';

const AdminChat = () => {
  const { adminid } = useParams();
  console.log(adminid,'adminindiidididdidi');
  const [recipientdetails, setRecipientDetails] = useState({})
  const [senderdetails, setSenderDetails] = useState({});
  const [senderid, setSenderId] = useState(null);
  const [recipientid, setRecipientId] = useState(null)
  const [clientstate, setClientState] = useState('');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('authToken')
  const { user_id } = jwtDecode(token)
  const messageRef = useRef()
  const navigate=useNavigate()

//   usernam = user(opposite side , reciever)
//   user_id = admin(sender)


  const setUserProfileDetails = async () => {
    axios.get(`${BACKEND_BASE_URL}/api/profile-user/${adminid}/`).then((response) => {
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

useEffect(()=>{
  setUserProfileDetails()
  setSenderProfile()
},[])

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
    setSenderId(user_id)
    setRecipientId(adminid)
    console.log(recipientid,'receitentid');

  }, [])

  useEffect(() => {
    if (senderid != null && recipientid != null) {
      setUpChat()
    }
  }, [senderid, recipientid, adminid])



  const onButtonClicked = () => {
    // console.log(senderid,recipientid,'tryyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    // console.log(senderdetails,recipientdetails,'details buttonclicked')


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
    messageRef.current.value = ''
  };


  return (
    <div className="w-9/12 border rounded lg:grid lg:grid-cols-3 m-3">
        <Chatlist/>
        <div className="hidden lg:col-span-2 lg:block">
            <div className="w-full">
                <div className="relative flex items-center p-3 border-b border-gray-300">
                    <img className="object-cover w-10 h-10 rounded-full"
                        src={BACKEND_BASE_URL + recipientdetails?.profile_img} alt="username" />
                    <span className="block ml-2 font-bold text-gray-600">{recipientdetails?.username}</span>
                    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                    </span>
                </div>
                <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                    <ul className="space-y-2">
                        {
                            messages.map((message) => {
                              console.log(message, "hjkk;lkkkkkkkkkkkkkkkkkkkkkkkk");
                                if (message.sender_username == recipientdetails.username) {
                                    return (
                                        <li className="flex justify-start">
                                            <div>
                                                <img
                                                   src={BACKEND_BASE_URL + recipientdetails?.profile_img}
                                                    alt="sender profile"
                                                    className="w-7 h-7 rounded-full order-1"
                                                />
                                            </div>
                                            <div className="relative max-w-xl px-6 py-2 text-gray-700 rounded-lg shadow">
                                                <span className="block">{message.message}</span>
                                            </div>
                                        </li>
                                    )
                                }
                                else {
                                    return (
                                        <li className="flex justify-end">
                                            <div className="relative max-w-xl px-6 py-2 text-gray-700 bg-gray-100 rounded-lg shadow">
                                                <span className="block">{message.message}</span>
                                            </div>
                                            <div>
                                                <img
                                                    src={BACKEND_BASE_URL + senderdetails?.profile_img}
                                                    className="w-7 h-7 rounded-full order-2"
                                                />
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>

                <div className="flex items-center justify-between w-full p-4 border-t border-gray-300 mt-12">
                    <input ref={messageRef} type="text" placeholder="Message"
                        className="block w-full py-3 pl-4 mx-4 bg-gray-200 rounded-full outline-none focus:text-gray-700"
                        name="message" required />
                    <button type="button" onClick={(e) => onButtonClicked()}>
                        <svg className="w-8 h-8 text-customColor origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
    }

export default AdminChat;