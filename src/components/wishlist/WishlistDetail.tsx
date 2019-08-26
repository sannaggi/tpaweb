import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getWishlist } from "../../actions/wishlistActions";
import WishlistDetailCard from "./WishlistDetailCard";
import WishlistDetailExperienceCard from "./WishlistDetailExperienceCard";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import '../../css/wishlist/wishlistDetail.css'

function WishlistDetail({ match, getWishlist, wishlist } : { match: any, getWishlist: any, wishlist: any }) {

    const PLACE_PANE = 'PLACE_PANE'
    const EXPERIENCE_PANE = 'EXPERIENCE_PANE'

    const [placeCounter, setPlaceCounter] = useState(0)
    const [experienceCounter, setExperienceCounter] = useState(0)
    const [placeMapCenter, setplaceMapCenter] = useState()
    const [experienceMapCenter, setexperienceMapCenter] = useState()
    const [placeCardRendered, setplaceCardRendered] = useState(0)
    const [placeTotalPosition, setPlaceTotalPosition] = useState({
        lat: 0,
        lng: 0
    })
    const [placeMarkers, setPlaceMarkers] = useState([])
    const [experienceCardRendered, setexperienceCardRendered] = useState(0)
    const [experienceTotalPosition, setexperienceTotalPosition] = useState({
        lat: 0,
        lng: 0
    })
    const [experienceMarkers, setexperienceMarkers] = useState([])
    const [map, setmap] = useState(
        <div className="gmap-notice">Nothing to show here</div>
    )
    const [paneStatus, setpaneStatus] = useState(PLACE_PANE)
    const [paneState, setpaneState] = useState({
        stays: "active",
        experiences: ""
    })
    const [wishlistContent, setwishlistContent] = useState({
        stay: null,
        experience: null
    })

    function updateRender(location: any, setMarker: any, setCardRendered: any, setTotalPosition: any) {
        setMarker(p => [...p, location])
        setCardRendered(p => p + 1)
        setTotalPosition(p => ({
            lat: p.lat + location.latitude, 
            lng: p.lng + location.longitude
        }))
    }
    
    const updateCardRendered = useCallback(
        (location, isPlace) => {
            if(isPlace) updateRender(location, setPlaceMarkers, setplaceCardRendered, setPlaceTotalPosition)
            else {
                updateRender(location, setexperienceMarkers, setexperienceCardRendered, setexperienceTotalPosition)
            }
        },
        [],
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
        if(experienceCardRendered === experienceCounter) {
            setexperienceMapCenter({
                lat: experienceTotalPosition.lat / experienceCounter,
                lng: experienceTotalPosition.lng / experienceCounter
            })
        }
    }, [experienceCardRendered, experienceCounter, experienceTotalPosition])

    useEffect(() => {
        getWishlist(match.params.id)
    }, [getWishlist, match.params.id])

    useEffect(() => {
        if(wishlist.name === undefined) return

        if(wishlist.stays !== null) {
            setPlaceCounter(wishlist.stays.length)
            setwishlistContent(p => (
                {
                    ...p, stay: <React.Fragment>
                        <div className="content-header">{placeCounter} stay{placeCounter > 1? "s" : ""}</div>
                        {wishlist.stays.map((stay: any) => (
                            <WishlistDetailCard id={stay} key={stay} updateCardRendered={updateCardRendered}/>
                        ))}
                    </React.Fragment>
                }
            ))
        } else {
            setPlaceCounter(0)
            setwishlistContent(p => ({
                ...p, stay: <div className="notice">No stays saved yet</div>
            }))
            setPlaceMarkers([])
        }
        if(wishlist.experiences !== null) {
            setExperienceCounter(wishlist.experiences.length)
            setwishlistContent(p => (
                {
                    ...p, 
                    experience: <React.Fragment>
                        <div className="content-header">{experienceCounter} experience{experienceCounter > 1? "s" : ""}</div>
                        <div className="experienceDetailContainer">
                            {wishlist.experiences.map((experience: any) => (
                                <WishlistDetailExperienceCard id={experience} key={experience} updateCardRendered={updateCardRendered}/>
                            ))}
                        </div>
                    </React.Fragment>
                }
            ))
            
        } else {
            setExperienceCounter(0)
            setwishlistContent(p => ({
                ...p, experience: <div className="notice">No experiences saved yet</div>
            }))
            setexperienceMarkers([])
        }
    }, [wishlist, updateCardRendered, wishlistContent, placeCounter, experienceCounter])

    function getMarkersMapping(markers: any) {
        return markers.map((marker: any) => (
            <Marker key={num++} position={{lat: marker.latitude, lng: marker.longitude}}></Marker>
        ))
    }

    function getMarkers(): any {
        if(paneStatus === PLACE_PANE) return getMarkersMapping(placeMarkers)
        else return getMarkersMapping(experienceMarkers)
    }

    var num = 0;

    function getLongLat(center) {
        return {
            lat: center.lat,
            lng: center.lng
        }
    }

    function getDefaultCenter() {
        if(paneStatus === PLACE_PANE) return getLongLat(placeMapCenter)
        return getLongLat(experienceMapCenter)
    }

    function getWrappedMap() {
        const WrappedMap = withScriptjs(withGoogleMap(() => {return (
            <GoogleMap 
                defaultZoom={14}
                defaultCenter={getDefaultCenter()}
            >
                {getMarkers()}
            </GoogleMap>
        )}))
        return <WrappedMap 
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
            loadingElement={<div style={{height: "100%"}}/>}
            containerElement={<div style={{height: "100%"}}/>}
            mapElement={<div style={{height: "100%"}}/>}
        />
    }

    useEffect(() => {
        if(placeMapCenter === undefined) return
        if(isNaN(placeMapCenter.lat)) return
        if(placeMarkers.length === 0) return

        setmap(
            getWrappedMap()
        )
        // eslint-disable-next-line
    }, [placeMapCenter, placeMarkers])
    
    useEffect(() => {
        if(experienceMapCenter === undefined) return
        if(isNaN(experienceMapCenter.lat)) return
        if(experienceMarkers.length === 0) return

        setmap(
            getWrappedMap()
        )
        // eslint-disable-next-line
    }, [experienceMapCenter, experienceMarkers])

    function changePane(pane) {
        if(pane === PLACE_PANE) {
            setpaneStatus(PLACE_PANE)
            setpaneState({
                stays: "active",
                experiences: ""
            })
        } else {
            setpaneStatus(EXPERIENCE_PANE)
            setpaneState({
                stays: "",
                experiences: "active"
            })
        }
    }

    function getContent() {
        if(paneStatus === PLACE_PANE) {
            return wishlistContent.stay
        }
        return wishlistContent.experience
    }

    return (
        <main className="wishlist-detail-container">
            <div className="wishlist-detail">
                <Link to="/wishlist">All lists</Link>
                <div className="detail-header">
                    <h1>{wishlist.name}</h1>
                    <div className="header-detail">No dates &#183; 1 guests</div>
                </div>
                <div className="pane-container">
                    <button className={"pane " + paneState.stays} onClick={() => changePane(PLACE_PANE)}><h3>Stays</h3></button>
                    <button className={"pane " + paneState.experiences} onClick={() => changePane(EXPERIENCE_PANE)}><h3>Experiences</h3></button>
                </div>
                <div className="wishlist-content">
                    {getContent()}
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
