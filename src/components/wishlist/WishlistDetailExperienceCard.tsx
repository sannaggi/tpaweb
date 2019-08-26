import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ExperienceCard from "../experiences/ExperienceCard";

function WishlistDetailExperienceCard({id, updateCardRendered} : {id: any, updateCardRendered: any}) {
    const [experience, setExperience] = useState()
    
    useEffect(() => {
        axios.get("https://aivbnbapi.herokuapp.com/api/experiences/" + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {
            setExperience(
                <ExperienceCard experience={data.data}/>
            )
            updateCardRendered(data.data.location, false)
        })
        // eslint-disable-next-line
    }, [id])

    return (
        <React.Fragment>
            {experience}
        </React.Fragment>
    )
}

export default WishlistDetailExperienceCard
