import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import { TEXT, IMAGE } from "./chatTypes";
import { setChatDetail } from "../../actions/chatActions";
import { Redirect } from "react-router-dom";

function ChatCard({callback, chat, user, currency, setChatDetail} : {callback: any, chat: any, user: any, currency: any, setChatDetail: any}) {

    const [otherUser, setOtherUser] = useState()
    const [content, setContent] = useState()
    const [statusContent, setstatusContent] = useState()
    const [firstRender, setfirstRender] = useState(true)
    const [redirect, setredirect] = useState()
    const [status, setStatus] = useState({
        starred: false,
        archived: false,
        unread: false
    })

    useEffect(() => {
        setfirstRender(false)
    }, [])

    useEffect(() => {
        if(!firstRender) return
        setStatus({...status, starred: chat.starred, archived: chat.archived})
    }, [chat, status, firstRender])

    const onClick = useCallback(
        (s) => {
            let value: any
            let statusType: string
            if(s === "starred") {
                value = !status.starred
                statusType = "starred"
                setStatus({...status, starred: value})
            }
            else if(s === "archived") {
                value = !status.archived
                statusType = "archived"
                setStatus({...status, archived: value})
            }

            axios({
                url: "https://aivbnbapi.herokuapp.com/api/chat/" + chat.id,
                method: "POST",
                data: {status: s, value: s === "starred"? !status.starred : !status.archived},
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            })

            callback(chat.id, statusType, value)
        },
        [chat.id, status, callback],
    )

    const getStar = useCallback(
        () => {
            if(status.starred === false) return <div className="status-type" onClick={() => onClick("starred")}><span className="icon star">&#9733;</span> Star</div>
            return <div className="status-type" onClick={() => onClick("starred")}><span className="icon star" style={{color: "rgb(238, 182, 0)"}}>&#9733;</span> Unstar</div>
        },
        [status.starred, onClick],
    )

    const getArchive = useCallback(
        () => {
            if(status.archived === false) return <div className="status-type" onClick={() => onClick("archived")}><span className="icon archive"><i className="fa fa-archive"></i></span> Archive</div>
            return <div className="status-type" onClick={() => onClick("archived")}><span className="icon archive"><i className="fa fa-archive"  style={{color: "rgb(238, 182, 0)"}}></i></span> Unarchive</div>
        },
        [status.archived, onClick],
    )

    useEffect(() => {
        setstatusContent(
            <React.Fragment>
                {getStar()}
                {getArchive()}
            </React.Fragment>
        )
    }, [status, getStar, getArchive])
    
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
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return monthNames[parseInt(el[1]) - 1] + " " + el[2]
        },
        [],
    )

    const getLastChatTime = useCallback(
        () => {
            let messages = chat.messages
            if(messages.length === 0) return ""
            return getMonthYear(messages[messages.length - 1].time)
        },
        [getMonthYear, chat.messages],
    )

    const getLastChat = useCallback(
        () => {
            let messages = chat.messages
            if(messages.length === 0) return ""
            
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
                        {statusContent}
                    </div>
                </div>
            </React.Fragment>
        )
    }, [otherUser, getLastChatTime, getLastChat, getStatus, getStar, getArchive, statusContent])

    function redirectClick(e) {
        if(e.target.className === "status-type") return
        setChatDetail(otherUser)
        setredirect(<Redirect push to="/chat/detail"/>)
    }

    return (
        <div className="chat-card-container" onClick={redirectClick}>
            {redirect}
            {content}
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
    currency: state.currency.item,
})

export default connect(mapStateToProps, { setChatDetail })(ChatCard)
