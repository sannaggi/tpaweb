import React, { } from 'react'
import Place from "./place";

function PlaceList({places} : {places:Array<Object>}) {
    return (
        <React.Fragment>
            {places.map((place:any) => ( 
                <Place key={place.id} place={place}/>
            ))}
        </React.Fragment>
    )
}

export default PlaceList