import React, { useEffect, useState } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import ChatCard from "./ChatCard";
import "../../css/chat/chat.css";

function Chat({user} : {user: any}) {

    const [chats, setChats] = useState([])
    const [allChat, setallChat] = useState()

    useEffect(() => {
        if(chats.length === 0) return
        getAllChat()
    }, [chats])

    useEffect(() => {
        if(user.id === undefined) return
        axios.get("https://aivbnbapi.herokuapp.com/api/chat/u/" + user.id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => setChats(data.data))
    }, [user])

    function changeStatus(id: any, status: string, value: boolean) {
        chats.forEach((chat) => {
            if(chat.id === id) {
                if(status === "starred") chat.starred = value
                else if(status === "archived") chat.archived = value
            }
        })
        getAllChat()
    }

    function getAllChat() {
        setallChat(chats.map((chat) => (<ChatCard callback={changeStatus} key={chat.id} chat={chat}/>)))
    }

    return (
        <main className="chat-container">
            <div className="title"><h1>Your Chats</h1></div>
            <div className="filter-container">
                <select name="" id="chat-filter">
                    <option value="all">All Messages</option>
                    <option value="starred">Starred</option>
                    <option value="unread">Unread</option>
                    <option value="archived">Archived</option>
                </select>
            </div>
            {allChat}
        </main>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
})

export default connect(mapStateToProps, {})(Chat)
