import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux';
import axios from "axios";
import { TEXT, IMAGE } from "./chatTypes";
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'
import '@fortawesome/fontawesome-free'
import ChatImage from './ChatImage';

function ChatMessage({chat, otherUser, user, socket} : {chat: any, otherUser: any, user: any, socket: any}) {

    const [messageContent, setmessageContent] = useState("")
    const [messages, setmessages] = useState([])

    useEffect(() => {
        setmessages(chat.messages)
        document.getElementsByClassName("emoji-picker")[0].setAttribute("style", "display: none")
    }, [chat.messages])

    function getDate() {
        const d = new Date()
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    }

    const addNewMessage = useCallback(
        (msg: string) => {
            getDate()
            axios({
                url: "https://aivbnbapi.herokuapp.com/api/chat/m/" + chat.id,
                method: "POST",
                data: {
                    "senderid": user.id,
                    "type": msg.split("base64").length > 1 ? IMAGE : TEXT,
                    "content": msg,
                    "time": getDate()
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
        },
        [chat.id, user.id],
    )

    const getMessageTime = useCallback(
        (message) => {
            let time = message.time
            if(time === undefined) time = getDate()
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            let el = time.split("/")
            return `${monthNames[parseInt(el[1]) - 1]} ${el[0]}, ${el[2]}`
        },
        [],
    )

    function differentiateMessageContent(message){
        console.log(message)
        if(message.content.split("base64").length > 1 || message.type === "image") return <ChatImage src={message.content} />
        else return message.content
    }

    useEffect(() => {
        if(socket === undefined) return

        const messageInput = document.getElementById('message-content')
        const messageForm = document.getElementById('message-form')
        const messagesContainer = document.getElementById("messages-container")

        messageForm.onsubmit = function(e) {
            e.preventDefault()
            if(messageInput.getAttribute("value") === "") return
            const data = {
                senderid: user.id,
                receiver: otherUser.id,
                type: "text",
                content: messageInput.getAttribute("value")
            }
            socket.emit('send message', data, addNewMessage(messageInput.getAttribute("value")))
            setmessageContent("")
            document.getElementsByClassName("emoji-picker")[0].setAttribute("style", "display: none")
        }

        socket.on('new message', function(data) {
            setmessages(m => [...m, data]);
        })
        // eslint-disable-next-line
    }, [socket, otherUser, user])

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
                <div className="message-content">{differentiateMessageContent(message)}</div>
                <small>{getMessageTime(message)}</small>
            </div>
        </div>
    }

    const onInputFile = (e) => {
        let reader = new FileReader()
        reader.onload = function(){
            let str = (reader.result + "")
            const data = {
                senderid: user.id,
                receiver: otherUser.id,
                type: "image",
                content: str
            }

            socket.emit('send message', data, addNewMessage(str))
            setmessageContent("")
            document.getElementsByClassName("emoji-picker")[0].setAttribute("style", "display: none")
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function getMessages() {
        if(messages.length === 0) return ""
        let rev = []
        messages.forEach(element => {
            rev.push(element)
        });
        return rev.map((message: any) => (
            differentianteMessage(message)
        ))
    }

    function onChange(e) {
        setmessageContent(e.target.value)
    }

    function onSelect(e) {
        let emoji = e.native;
        setmessageContent(m => m + emoji)
        document.getElementById("message-content").focus()
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
            <span className="emoji-picker"><Picker onSelect={onSelect} /></span>
            <form id="message-form" autoComplete="off" method="">
                <div className="input-container">
                    <input type="text" id="message-content" onChange={onChange} value={messageContent}/>
                    <span className="emoji" role="img" aria-label="emoji" onClick={onClick}>😀</span>
                    <span className="emoji" >
                        <input type="file" accept="image/*" name="" id="picUp" onChange={onInputFile} style={{display: "none", cursor: "pointer"}}/>
                        <label htmlFor="picUp" style={{cursor: "pointer"}}><i className="fa fa-image"></i></label>
                    </span>
                    <input type="submit" className="green-button" value="Send"/>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    socket: state.user.socket,
    otherUser: state.chat.otherUser,
    user: state.user.item
})

export default connect(mapStateToProps, {})(ChatMessage)
