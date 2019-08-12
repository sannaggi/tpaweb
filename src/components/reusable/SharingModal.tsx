import React from 'react'
import "../../css/reusable/SharingModal.css"
import {FacebookShareButton, EmailShareButton} from 'react-share';

export default function SharingModal(){
    function clipBoard(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        document.getElementById("urlCopied").setAttribute("style", "opacity: 1");
    }

    return(
        <div className="modal" id="sharingModal">
            <div className="modal-content">
                <div className="close-modal" onClick={
                    () => {
                        document.getElementById("btn").setAttribute("style", "z-index: 1000")
                        document.getElementById("sharingModal").setAttribute("style", "display: none !important")
                        document.getElementById("urlCopied").setAttribute("style", "opacity: 0");
                    }
                }>&#10005;</div>
                <div id="urlCopied">URL copied to your ClipBoard</div>
                <button id="copyUrl" onClick={clipBoard}><span>Copy Link Url</span></button>
                <FacebookShareButton url={window.location.href}><button id="facebook"><img src="http://localhost:3000/images/icons/facebook.png" alt=""/><span>Facebook</span></button></FacebookShareButton>
                <EmailShareButton url={window.location.href}><button id="email"><img src="http://localhost:3000/images/icons/email.png" alt=""/><span>Email</span></button></EmailShareButton>
            </div>
        </div>
    )
}