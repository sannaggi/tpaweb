import React from 'react'
import {FacebookShareButton, EmailShareButton} from 'react-share';
import "../../css/reusable/sharing.css";

export default function Sharing(){
    function clipBoard(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        document.getElementById("urlCopied").setAttribute("style", "opacity: 1");
    }
    return(
        <div id="btn">
            <div id="shareBtn">
                <div id="urlCopied">URL copied to clipboard</div>
                <div className="shareChild" id="firstSC" onClick={clipBoard} 
                onMouseOut={function(){
                    document.getElementById("urlCopied").setAttribute("style", "opacity: 0");
                }}
                ></div>
                <div className="shareChild" id="secondSC"><FacebookShareButton url={window.location.href}/></div>
                <div className="shareChild" id="thirdSC"><EmailShareButton url={window.location.href} /></div>
            </div>
            <div id="saveBtn"></div>
        </div>
    )
}