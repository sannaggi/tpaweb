import React, { useState } from 'react'
import '../../css/chat/chatImage.css'

export default function ChatImage({src} : {src: any}){

    const [style, setStyle] = useState({})

    const onClose = () => {
        setStyle({
            display: "none"
        })
    }

    const onOpen = () => {
        setStyle({
            display: "flex"
        })
    }

    return(
        <React.Fragment>
            <div className="chatImgModal" style={style} onClick={onClose}>
                <img src={src} alt=""/>
            </div>
            <img src={src} alt="" onClick={onOpen}/>
            <a className="chatImgdl" href={src} download>Download</a>
        </React.Fragment>
    )
}