import React, { useEffect } from 'react'
import '../../css/reusable/favoriteModal.css'
import { connect } from 'react-redux';
import FavoriteModalItem from "./FavoriteModalItem";

function FavoriteModal({wishlists} : {wishlists: any}) {

    useEffect(() => {
        document.getElementById("favoriteModal").addEventListener("click", onClick);
    }, [])

    function onClick(e) {   
        if(e.target.className === 'modal' || e.target.className === 'close-modal')
            document.getElementById("favoriteModal").setAttribute("style", "display: none");
    }

    function showModal() {
        document.getElementById("wishlistModal").setAttribute("style", "display: block")
    }

    function getWishlist() {
        if(wishlists == null) return
        return wishlists.map((wishlist: any) => (
            <FavoriteModalItem key={wishlist.id} wishlist={wishlist}/>
        ))
    }

    return (
        <div className="modal" id="favoriteModal">
            <div className="modal-content login-content">
                <div className="close-modal">&#10005;</div>
                <div className="favorite-modal-content">
                    <h2>Save to list</h2>
                    <div className="create-list" onClick={showModal}>Create New List</div>
                    <hr/>
                    {getWishlist()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items,
    current: state.wishlist.active
})

export default connect(mapStateToProps, {})(FavoriteModal)
