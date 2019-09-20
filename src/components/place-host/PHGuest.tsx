import React from 'react'
import '../../css/place-host/PHGuest.css'

export default function PHGuest(){
    return(
        <div id="PHGuestSection" style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/host-wallpaper/guest.jpg)" }}>
            <div>
                <h2>Guest</h2>
                <div className="input">
                    <input type="number"  placeholder=" " name="" id="maxGuest"/>
                    <div className="label">Maximum Guest</div>
                </div>
                <div className="input">
                    <input type="number"  placeholder=" " name="" id="price"/>
                    <div className="label">Price</div>
                </div>
            </div>
            <div></div>
        </div>
    )
}