import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Place from "../places/place";

function WishlistDetailCard({id, updateCardRendered} : {id: any, updateCardRendered: any}) {

    const [place, setPlace] = useState()
    
    useEffect(() => {
        axios.get("https://aivbnbapi.herokuapp.com/api/places/" + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {
            setPlace(
                <Place place={data.data}/>
            )
            updateCardRendered(data.data.location, true)
        })
    }, [id])

    return (
        <React.Fragment>
            {place}
        </React.Fragment>
    )
}

export default WishlistDetailCard
