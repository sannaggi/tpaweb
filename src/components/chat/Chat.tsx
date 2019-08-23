import React, { useEffect, useState } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import ChatCard from "./ChatCard";
import "../../css/chat/chat.css";

function Chat({user} : {user: any}) {

    const [chats, setChats] = useState([])

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
            {chats.map((chat) => (<ChatCard key={chat.id} chat={chat}/>))}
        </main>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
})

export default connect(mapStateToProps, {})(Chat)
