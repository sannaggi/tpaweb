import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import axios from "axios";

function WishlistModal({user, refreshWishlists} : {user: any, refreshWishlists: any}) {
    
    const [newWishlist, setNewWishlist] = useState({
        name: "",
        privacy: "public"
    })

    useEffect(() => {
        document.getElementById("wishlistModal").addEventListener("click", onClick);
    }, []);

    function closeModal() {
        document.getElementById("wishlistModal").setAttribute("style", "display: none");
    }

    function onClick(e) {
        if (e.target.className === "modal" || e.target.className === "close-modal")
        document.getElementById("wishlistModal").setAttribute("style", "display: none");
    }

    function onChange(e) {
        setNewWishlist({...newWishlist, [e.target.name]: e.target.value})
    }

    function onCancel() {
        setNewWishlist({
            name: "",
            privacy: "public"
        })
        closeModal()
    }

    function addNewWishlist() {
        axios({
            url: `https://aivbnbapi.herokuapp.com/api/wishlist/`,
            method: "POST",
            data: {...newWishlist, userid: user.id},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(_ => refreshWishlists())
    }

    function onSubmit(e) {
        e.preventDefault()
        addNewWishlist()
        closeModal()
    }

    return (
        <div className="modal" id="wishlistModal">
            <div className="modal-content login-content">
                <div className="close-modal">&#10005;</div>
                <h2>Create a list</h2>
                <form onSubmit={onSubmit}>
                    <div className="inputField">
                        <label htmlFor="wishlistName">Name</label>
                        <input name="name" type="text" id="wishlistName" placeholder="Name your list" onChange={onChange} value={newWishlist.name}/>
                    </div>
                    <div className="inputField">
                        <label htmlFor="wishlistPrivacy">Privacy settings</label>
                        <br/>
                        <select name="privacy" id="wishlistPrivacy" onChange={onChange} value={newWishlist.privacy}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <button type="submit" style={{marginRight: "7px"}} className="wish-button green-button">Save</button> <button type="button" onClick={onCancel} className="wish-button white-button">Cancel</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {})(WishlistModal)
