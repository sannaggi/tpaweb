import React, { useEffect } from 'react'
import PHBasics from './PHBasics';
import PHScene from './PHScene';
import PHGuest from './PHGuest';
import '../../css/place-host/PlaceHost.css'

export default function PlaceHost(){
    useEffect(() => {
        setTimeout(() => {
            document.getElementById('')
        },1000)
    })

    return(
        <div id="placeHost">
            <PHBasics/>
            <PHScene />
            <PHGuest />
        </div>
    )
}