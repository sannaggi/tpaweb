import React from 'react'

function ChatMessage({user, otherUser, messages} : {user: any, otherUser: any, messages: any}) {

    function differentianteMessage(message: any, key: number) {
        let c = "ours"
        let image = user.profileimage;
        if(message.senderid !== user.id) {
            c = "theirs"
            image = otherUser.profileimage
        }
        return <div className={"message-container " + c} key={key}>
            <img src={image} className="profile-image"/>
            <div className="message-content">{message.content}</div>
        </div>
    }

    function getMessages() {
        let key = 0;
        return messages.map((message: any) => (
            differentianteMessage(message, key++)
        ))
    }

    return (
        <div className="chats-container">
            <div className="messages-container">
                {getMessages()}
            </div>
            <div className="input-container">
                <textarea placeholder="Input message" rows={1}></textarea>
                <button className="green-button">Send</button>
            </div>
        </div>
    )
}

export default ChatMessage
