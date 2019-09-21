import React from 'react'
import '../../css/place-host/PHGuest.css'

export default function PHGuest(){
    function numberValidation(e){
        if(e.target.value < 0){
            e.target.value = 0
            alert('cannot be lowered than 0')
        }
    }

    return(
        <div id="PHGuestSection" style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/host-wallpaper/guest.jpg)" }}>
            <div>
                <h2>Guest</h2>
                <div className="input">
                    <input type="number"  placeholder=" " name="" id="maxGuest" onChange={numberValidation}/>
                    <div className="label">Maximum Guest</div>
                </div>
                <div className="input">
                    <input type="number"  placeholder=" " name="" id="price" onChange={numberValidation}/>
                    <div className="label">Price</div>
                </div>
            </div>
            <div></div>
        </div>
    )
}