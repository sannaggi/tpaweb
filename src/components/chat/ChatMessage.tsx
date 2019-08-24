import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import axios from "axios";
import { TEXT } from "./chatTypes";
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'

function ChatMessage({chat, user, otherUser, messages, socket} : {chat: any, user: any, otherUser: any, messages: any, socket: any}) {

    const [messageContent, setmessageContent] = useState("")

    function getDate() {
        const d = new Date()
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    }

    function addNewMessage(msg: String) {
        getDate()
        axios({
            url: "https://aivbnbapi.herokuapp.com/api/chat/m/" + chat.id,
            method: "POST",
            data: {
                "senderid": user.id,
                "type": TEXT,
                "content": msg,
                "time": getDate()
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    function scrollToBottom(el: any) {
        el.scrollTop = el.scrollHeight
    }

    useEffect(() => {
        if(socket === undefined) return

        const messageInput = document.getElementById('message-content')
        const messageForm = document.getElementById('message-form')
        const messagesContainer = document.getElementById("messages-container")

        scrollToBottom(messagesContainer)

        messageForm.onsubmit = function(e) {
            e.preventDefault()
            const data = {
                sender: user.id,
                receiver: otherUser.id,
                type: "text",
                content: messageInput.getAttribute("value")
            }
            socket.emit('send message', data, addNewMessage(messageInput.getAttribute("value")))
            setmessageContent("")
        }

        socket.on('new message', function(data) {
            let c = "ours"
            let image = user.profileimage;
            if(data.sender !== user.id) {
                c = "theirs"
                image = otherUser.profileimage
            }

            messagesContainer.innerHTML += `<div class= "message-container ${c}">
                <img src=${image} class="profile-image"/>
                <div>
                    <div class="message-content">${data.content}</div>
                    <small>${getMessageTime({})}</small>
                </div>
            </div>`
            
            scrollToBottom(messagesContainer)
        })
    }, [socket, otherUser, user])

    function getMessageTime(message: any) {
        let time = message.time
        if(time === undefined) time = getDate()
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let el = time.split("/")
        return `${monthNames[parseInt(el[1]) - 1]} ${el[0]}, ${el[2]}`
    }

    function differentianteMessage(message: any) {
        let c = "ours"
        let image = user.profileimage;
        if(message.senderid !== user.id) {
            c = "theirs"
            image = otherUser.profileimage
        }

        return <div className={"message-container " + c}>
            <img src={image} className="profile-image" alt=""/>
            <div>
                <div className="message-content">{message.content}</div>
                <small>{getMessageTime(message)}</small>
            </div>
        </div>
    }

    function getMessages() {
        if(messages.length === 0) return ""
        return messages.map((message: any) => (
            differentianteMessage(message)
        ))
    }

    function onChange(e) {
        setmessageContent(e.target.value)
    }

    function onSelect(e) {
        let emoji = e.native;
        setmessageContent(m => m + emoji)
    }

    function onClick() {
        const emoji = document.getElementsByClassName("emoji-picker")[0]
        if(emoji.getAttribute("style") === null || emoji.getAttribute("style") === "display: none") emoji.setAttribute("style", "display: block")
        else emoji.setAttribute("style", "display: none")
    }

    return (
        <div className="chats-container">
            <div className="messages-container" id="messages-container">
                {getMessages()}
            </div>
            <form id="message-form" autoComplete="off">
                <div className="input-container">
                    <div className="emoji-picker"><Picker onSelect={onSelect} /></div>
                    <input autoComplete="off" type="text" id="message-content" onChange={onChange} value={messageContent}/>
                    <span className="emoji" onClick={onClick}>😀</span>
                    <input type="submit" className="green-button" value="Send"/>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    socket: state.user.socket,
})

export default connect(mapStateToProps, {})(ChatMessage)
