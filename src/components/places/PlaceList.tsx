import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchAllPlace } from "../../actions/placeActions";
import Place from "./place";

//TODO change with controlled fetch
function PlaceList({places, fetchAllPlace} : {places:Array<Object>, fetchAllPlace:any}) {
    
    useEffect(() => {
        fetchAllPlace()
    }, [fetchAllPlace])
    
    return (
        <React.Fragment>
            {places.map((place:any) => ( 
                <Place key={place.id} place={place}/>
            ))}
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    places: state.places.items
})

export default connect(mapStateToProps, { fetchAllPlace })(PlaceList)