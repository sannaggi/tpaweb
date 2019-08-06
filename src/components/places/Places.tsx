import React, { useEffect, useState } from 'react'
import '../../css/places/places.css'
import PlaceList from "./PlaceList";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';
import { fetchAllPlace } from "../../actions/placeActions";

function Places({location, fetchAllPlace, places, currCard} : {location:any, fetchAllPlace:Function, places:Array<any>, currCard:any}) {
    
    const [markers, setMarkers] = useState(null)
    // const [currCard, setCurrCard] = useState(null)

    useEffect(() => {
        let header = document.getElementsByTagName("header")[0]
        header.setAttribute("style", "position: fixed")
        fetchAllPlace()
    }, [fetchAllPlace])

    useEffect(() => {
        function getMarker(place) {
            if(place.id === currCard) return <Marker key={place.id} zIndex={5} position={{lat: place.location.latitude, lng: place.location.longitude}} label={place.price + ""}></Marker>
            return <Marker key={place.id} position={{lat: place.location.latitude, lng: place.location.longitude}} label={place.price + ""}></Marker>
        }

        setMarkers(
            places.map((place) => (
                getMarker(place)
            ))
        )
    }, [places, currCard])


    function Map() {
        if(location !== undefined && location.lat !== 0 && location.lng !== 0)
            return (
                <GoogleMap 
                    defaultZoom={12}
                    defaultCenter={{lat: location.lat, lng: location.lng}}
                >
                    {markers}
                </GoogleMap>
            )
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map))

    return (
        <main className="placesContainer">
            <div className="detail-container">
                <PlaceList places={places}/>
            </div>
            <div className="map-container">
                <div className="container">
                    <WrappedMap 
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
                        loadingElement={<div style={{height: "100%"}}/>}
                        containerElement={<div style={{height: "100%"}}/>}
                        mapElement={<div style={{height: "100%"}}/>}
                        />
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = (state: any) => ({
    location: state.location.item,
    places: state.places.items,
    currCard: state.places.currCard
})

export default connect(mapStateToProps, { fetchAllPlace })(Places)
