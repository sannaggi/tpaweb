import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { v4 } from "uuid";

function ChatMessage({user, otherUser, messages, socket} : {user: any, otherUser: any, messages: any, socket: any}) {

    const [messageContent, setmessageContent] = useState("")

    useEffect(() => {
        if(socket === undefined) return

        const messageInput = document.getElementById('message-content')
        const messageForm = document.getElementById('message-form')
        const messagesContainer = document.getElementById("messages-container")

        messageForm.onsubmit = function(e) {
            e.preventDefault()
            const data = {
                sender: user.id,
                receiver: otherUser.id,
                type: "text",
                content: messageInput.getAttribute("value")
            }
            // console.log(socket.id)
            socket.emit('send message', data)
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
                <div class="message-content">${data.content}</div>
            </div>`
        })
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
            <div className="message-content">{message.content}</div>
        </div>
    }

    function getMessages() {
        return messages.map((message: any) => (
            differentianteMessage(message)
        ))
    }

    function onChange(e) {
        setmessageContent(e.target.value)
    }

    return (
        <div className="chats-container">
            <div className="messages-container" id="messages-container">
                {getMessages()}
            </div>
            <form id="message-form" autoComplete="off">
                <div className="input-container">
                    <input autoComplete="off" type="text" id="message-content" onChange={onChange} value={messageContent}/>
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
