import React from 'react'
import "../../css/reusable/sharing.css";
import { setActiveWishlistModal } from "../../actions/wishlistActions";
import { connect } from 'react-redux';
import SharingModal from './SharingModal'

function Sharing({id, isPlace, setActiveWishlistModal, user} : {id: any, isPlace: any, setActiveWishlistModal: any, user:any}){
    function clipBoard(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        document.getElementById("urlCopied").setAttribute("style", "opacity: 1");
    }

    function showForm(com) {
        document.getElementById(com).setAttribute("style", "display: block;");
        document.getElementById("btn").setAttribute("style", "z-index: 1002")
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
            <SharingModal />
            <div id="shareBtn" onClick={() => showForm("sharingModal")}>
                {/* <div id="urlCopied">URL copied to clipboard</div>
                <div className="shareChild" id="firstSC" onClick={clipBoard} 
                onMouseOut={function(){
                    document.getElementById("urlCopied").setAttribute("style", "opacity: 0");
                }}
                ></div> */}
            </div>
            <div id="saveBtn" onClick={onClick}></div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
})

export default connect(mapStateToProps, { setActiveWishlistModal })(Sharing)