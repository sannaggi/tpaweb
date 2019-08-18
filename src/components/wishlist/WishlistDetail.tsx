import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getWishlist } from "../../actions/wishlistActions";
import WishlistDetailCard from "./WishlistDetailCard";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import '../../css/wishlist/wishlistDetail.css'

function WishlistDetail({ match, getWishlist, wishlist } : { match: any, getWishlist: any, wishlist: any }) {

    const [content, setContent] = useState()
    const [placeCounter, setPlaceCounter] = useState(0)
    const [placeCardRendered, setplaceCardRendered] = useState(0)
    const [placeMapCenter, setplaceMapCenter] = useState()
    const [placeTotalPosition, setPlaceTotalPosition] = useState({
        lat: 0,
        lng: 0
    })
    const [placeMarkers, setPlaceMarkers] = useState([])
    const [map, setmap] = useState()
    const [paneState, setpaneState] = useState({
        stays: "active",
        experiences: ""
    })
    
    const updateCardRendered = useCallback(
        (location) => {
            setPlaceMarkers(p => [...p, location])
            setplaceCardRendered(p => p + 1)
            setPlaceTotalPosition({
                lat: placeTotalPosition.lat + location.latitude, 
                lng: placeTotalPosition.lng + location.longitude
            })
        },
        [placeTotalPosition.lat, placeTotalPosition.lng],
    )

    useEffect(() => {
        if(placeCardRendered === placeCounter) {
            setplaceMapCenter({
                lat: placeTotalPosition.lat / placeCounter,
                lng: placeTotalPosition.lng / placeCounter
            })
        }
    }, [placeCardRendered, placeCounter, placeTotalPosition])

    useEffect(() => {
        getWishlist(match.params.id)
    }, [getWishlist, match.params.id])

    useEffect(() => {
        if(wishlist.name === undefined) return

        setPlaceCounter(wishlist.stays.length)
        setContent(
            wishlist.stays.map((stay: any) => (
                <WishlistDetailCard id={stay} key={stay} updateCardRendered={updateCardRendered}/>
            ))
        )
    }, [wishlist, updateCardRendered])

    const Map = useCallback(
        () => {
            return (
                <GoogleMap 
                    defaultZoom={12}
                    defaultCenter={{lat: placeMapCenter.lat, lng: placeMapCenter.lng}}
                >
                    {placeMarkers.map((marker: any) => (
                        <Marker key={marker.lat + marker.lng} position={{lat: marker.latitude, lng: marker.longitude}}></Marker>
                    ))}
                </GoogleMap>
            )
        },
        [placeMapCenter],
    )

    useEffect(() => {
        if(placeMapCenter === undefined) return
        if(isNaN(placeMapCenter.lat)) return
        if(placeMarkers.length === 0) return

        const WrappedMap = withScriptjs(withGoogleMap(Map))
        setmap(
            <WrappedMap 
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
                loadingElement={<div style={{height: "100%"}}/>}
                containerElement={<div style={{height: "100%"}}/>}
                mapElement={<div style={{height: "100%"}}/>}
            />
        )
    }, [placeMapCenter, Map, placeMarkers])

    
    return (
        <main className="wishlist-detail-container">
            <div className="wishlist-detail">
                <Link to="/wishlist">All lists</Link>
                <div className="detail-header" onClick={() => console.log(placeMarkers)}>
                    <h1>{wishlist.name}</h1>
                    <div className="header-detail">No dates &#183; 1 guests</div>
                </div>
                <div className="pane-container">
                    <button className={"pane " + paneState.stays}><h3>Stays</h3></button>
                    <button className={"pane " + paneState.experiences}><h3>Experiences</h3></button>
                </div>
                <div className="wishlist-content">
                    <div className="content-header">{placeCounter} stay{placeCounter > 1? "s" : ""}</div>
                    {content}
                </div>
            </div>
            <div className="wishlist-map">
                <div className="map-container">
                    <div className="container">
                        {map}
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.item
})

export default connect(mapStateToProps, { getWishlist })(WishlistDetail)
