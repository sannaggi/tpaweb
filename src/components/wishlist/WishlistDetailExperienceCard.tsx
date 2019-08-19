import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ExperienceCard from "../experiences/ExperienceCard";

function WishlistDetailExperienceCard({id, updateCardRendered} : {id: any, updateCardRendered: any}) {
    const [place, setPlace] = useState()
    
    useEffect(() => {
        axios.get("https://aivbnbapi.herokuapp.com/api/experiences/" + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {
            setPlace(
                <ExperienceCard experience={data.data}/>
            )
            // updateCardRendered(data.data.location)
        })
    }, [id])

    return (
        <React.Fragment>
            {place}
        </React.Fragment>
    )
}

export default WishlistDetailExperienceCard
