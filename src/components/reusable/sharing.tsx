import React from 'react'
import "../../css/reusable/sharing.css";
import SharingModal from './SharingModal'

export default function Sharing(){
    function showForm(com) {
        document.getElementById(com).setAttribute("style", "display: block;");
        document.getElementById("btn").setAttribute("style", "z-index: 1002")
    }
    return(
        <div id="btn">
            <SharingModal />
            <div id="shareBtn" onClick={() => showForm("sharingModal")}>
                {/* <div id="urlCopied">URL copied to clipboard</div>
                <div className="shareChild" id="firstSC" onClick={clipBoard} 
                onMouseOut={function(){
                    document.getElementById("urlCopied").setAttribute("style", "opacity: 0");
                }}
                ></div> */}
            </div>
            <div id="saveBtn"></div>
        </div>
    )
}