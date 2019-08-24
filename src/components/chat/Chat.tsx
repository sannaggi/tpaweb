import React, { useEffect, useState } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import ChatCard from "./ChatCard";
import "../../css/chat/chat.css";
import { ALL, STARRED, ARCHIVED, UNREAD } from "./filterTypes";
import ChatDetail from "./ChatDetail";

function Chat({user} : {user: any}) {

    const [otherUser, setotherUser] = useState()
    const [messages, setMessages] = useState()
    const [redirectToDetail, setredirectToDetail] = useState(false)
    const [chats, setChats] = useState([])
    const [allChat, setallChat] = useState()
    const [filter, setFilter] = useState(ALL)
    const [content, setContent] = useState(
        <main className="chat-container">
            <div className="title"><h1>Your Chats</h1></div>
            <div className="filter-container">
                <select onChange={onChange} name="" id="chat-filter">
                    <option value={ALL}>All Messages</option>
                    <option value={STARRED}>Starred</option>
                    <option value={UNREAD}>Unread</option>
                    <option value={ARCHIVED}>Archived</option>
                </select>
            </div>
            {allChat}
        </main>
    )

    useEffect(() => {
        if(redirectToDetail === true) {
            setContent(<ChatDetail messages={messages} otherUser={otherUser}/>)
            return
        }
        setContent(<main className="chat-container">
            <div className="title"><h1>Your Chats</h1></div>
            <div className="filter-container">
                <select onChange={onChange} name="" id="chat-filter">
                    <option value={ALL}>All Messages</option>
                    <option value={STARRED}>Starred</option>
                    <option value={UNREAD}>Unread</option>
                    <option value={ARCHIVED}>Archived</option>
                </select>
            </div>
            {allChat}
        </main>)
    }, [allChat, redirectToDetail, otherUser, messages])

    useEffect(() => {
        if(chats == null || chats.length === 0) {
            setallChat(<div style={{textAlign: "center"}}><h1>You have no chats</h1></div>)
            return
        }
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

    useEffect(() => {
        getAllChat()
    }, [filter])

    function chatCardCallback(otherUser: any, messages: any) {
        setotherUser(otherUser)
        setMessages(messages)
        setredirectToDetail(true)
    }

    function getAllChat() {
        if(chats === null) return
        let c: any;
        if(filter === ALL) c = chats.filter((chat) => {return chat.archived === false})
        else if(filter === ARCHIVED) c = chats.filter((chat) => {return chat.archived === true})
        else if(filter === STARRED) c = chats.filter((chat) => {return chat.starred === true && chat.archived === false})
        else if(filter === UNREAD) c = chats.filter((chat) => {return chat.unread === true && chat.archived === false})
        setallChat(c.map((chat: any) => (<ChatCard chatCardCallback={chatCardCallback} callback={changeStatus} key={chat.id} chat={chat}/>)))
    }

    function onChange(e: any) {
        setFilter(e.target.value)
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
})

export default connect(mapStateToProps, {})(Chat)
