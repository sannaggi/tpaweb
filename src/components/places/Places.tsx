import React, { useEffect, useState } from 'react'
import '../../css/places/places.css'
import PlaceList from "./PlaceList";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';
import { fetchAllPlace } from "../../actions/placeActions";
import ReactPaginate from "react-paginate";

function Places({location, fetchAllPlace, places, currCard} : {location:any, fetchAllPlace:Function, places:Array<any>, currCard:any}) {
    
    const [markers, setMarkers] = useState(null)
    const [renderedPlaces, setrenderedPlaces] = useState([])
    const [map, setmap] = useState()

    useEffect(() => {
        fetchAllPlace()
    }, [fetchAllPlace])

    useEffect(() => {
        if(places === null || places === undefined) return
        setrenderedPlaces(places.slice(0 * perPage, 0 * perPage + perPage))
        setmap(
            <WrappedMap 
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
                loadingElement={<div style={{height: "100%"}}/>}
                containerElement={<div style={{height: "100%"}}/>}
                mapElement={<div style={{height: "100%"}}/>}
            />
        )
    }, [places])

    useEffect(() => {
        function getMarker(place) {
            if(place.id === currCard) return <Marker key={place.id} zIndex={5} position={{lat: place.location.latitude, lng: place.location.longitude}} label={place.price + ""}></Marker>
            return <Marker key={place.id} position={{lat: place.location.latitude, lng: place.location.longitude}} label={place.price + ""}></Marker>
        }

        setMarkers(
            renderedPlaces.map((place) => (
                getMarker(place)
            ))
        )
        
        setmap(
            <WrappedMap 
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
                loadingElement={<div style={{height: "100%"}}/>}
                containerElement={<div style={{height: "100%"}}/>}
                mapElement={<div style={{height: "100%"}}/>}
            />
        )
    }, [places, currCard, renderedPlaces])


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
    const perPage = 2

    function handlePageChange(data: any) {
        setrenderedPlaces(places.slice(data.selected * perPage, data.selected * perPage + perPage))
    }

    return (
        <main className="placesContainer">
            <div className="detail-container">
                <PlaceList places={renderedPlaces}/>
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageCount={places.length / perPage}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
            <div className="map-container">
                <div className="container">
                    {map}
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
