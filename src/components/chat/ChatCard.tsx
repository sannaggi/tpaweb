import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import { TEXT, IMAGE } from "./chatTypes";

function ChatCard({chat, user, currency} : {chat: any, user: any, currency: any}) {

    const [otherUser, setOtherUser] = useState()
    const [content, setContent] = useState()
    
    const getCurrency = useCallback(
        (price) => {
            return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
        },
        [currency],
    )

    const getOtherUser = useCallback(
        () => {
            return chat.users[chat.users[0] !== user.id? 0 : 1]
        },
        [chat.users, user.id],
    )

    useEffect(() => {
        axios.get("https://aivbnbapi.herokuapp.com/api/users/" + getOtherUser(), {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {setOtherUser(data.data)})
    }, [getOtherUser])

    const getMonthYear = useCallback(
        (date) => {
            let el = date.split("/")
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return monthNames[el[1]] + " " + el[2]
        },
        [],
    )

    const getLastChatTime = useCallback(
        () => {
            let messages = chat.messages
            return getMonthYear(messages[messages.length - 1].time)
        },
        [getMonthYear, chat.messages],
    )

    const getLastChat = useCallback(
        () => {
            let messages = chat.messages
            let lastMessage = messages[messages.length - 1]
            
            if(lastMessage.type === TEXT) return lastMessage.content
            else if(lastMessage.type === IMAGE) return "image"
        },
        [chat.messages],
    )

    const getStatus = useCallback(
        () => {
            if(chat.status === "Inquiry") {
                return <div className="status inquiry">Inquiry</div>
            }
            return <React.Fragment>
                <div className="status completed">Completed</div>
                <div>{getCurrency(chat.price)}</div>
            </React.Fragment>
        },
        [chat, getCurrency],
    )

    const getStar = useCallback(
        () => {
            if(chat.starred === false) return <div><span className="icon star">&#9733;</span> Star</div>
            return <div><span className="icon star" style={{color: "rgb(238, 182, 0)"}}>&#9733;</span> Unstar</div>
        },
        [chat.starred],
    )

    const getArchive = useCallback(
        () => {
            if(chat.archived === false) return <div><span className="icon archive"><i className="fa fa-archive"  style={{color: "rgb(238, 182, 0)"}}></i></span> Archive</div>
            return <div><span className="icon archive"><i className="fa fa-archive"  style={{color: "rgb(238, 182, 0)"}}></i></span> Unarchive</div>
        },
        [chat.archived],
    )

    useEffect(() => {
        if(otherUser === undefined) return
        setContent(
            <React.Fragment>
                <div>
                    <div className="content-section"><img src={otherUser.profileimage} className="profile-image" alt=""/></div>
                    <div className="content-section name-date center">
                        <div id="name">{otherUser.firstname}</div>
                        <div>{getLastChatTime()}</div>
                    </div>
                    <div className="content-section center chat"><div>{getLastChat()}</div></div>
                </div>
                <div>
                    <div className="content-section center">
                        {getStatus()}
                    </div>
                    <div className="content-section center chat-status">
                        {getStar()}
                        {getArchive()}
                    </div>
                </div>
            </React.Fragment>
        )
    }, [otherUser, getLastChatTime, getLastChat, getStatus, getStar, getArchive])


    return (
        <div className="chat-card-container">
            {content}
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
    currency: state.currency.item,
})

export default connect(mapStateToProps, {})(ChatCard)
