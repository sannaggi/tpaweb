import React from 'react'
import {FacebookShareButton, EmailShareButton} from 'react-share';
import "../../css/reusable/sharing.css";
import { setActiveWishlistModal } from "../../actions/wishlistActions";
import { connect } from 'react-redux';

function Sharing({id, isPlace, setActiveWishlistModal, user} : {id: any, isPlace: any, setActiveWishlistModal: any, user:any}){
    function clipBoard(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        document.getElementById("urlCopied").setAttribute("style", "opacity: 1");
    }

    function onClick() {
        if(user.id === undefined) {
            document.getElementById("loginModal").setAttribute("style", "display: block")
            return
        }
        setActiveWishlistModal({
            id: id,
            isPlace: isPlace
        })
        document.getElementById("favoriteModal").setAttribute("style", "display: block")
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
            <div id="saveBtn" onClick={onClick}></div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
})

export default connect(mapStateToProps, { setActiveWishlistModal })(Sharing)