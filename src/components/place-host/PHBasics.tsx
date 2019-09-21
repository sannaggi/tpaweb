import React, { useState, useEffect } from 'react'
import '../../css/place-host/PHBasics.css'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Axios from 'axios'

export default function PHBasics(){

    const [map, setmap] = useState()
    const [location, setLocation] = useState({
        country: "",
        city: "",
        street: "",
        postal_code: "",
        data: [{
            lat: 0,
            lon: 0,
            display_name: "",
            boundingbox: []
        }]
    })

    useEffect(() =>{
        const MapComponent = withScriptjs(withGoogleMap(Map))
        setmap(
            <MapComponent 
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
                loadingElement={<div style={{ height: "100%"}}/>}
                containerElement={<div style={{ height: "100%"}}/>}
                mapElement={<div style={{height: "100%"}}/>}
            />
        )
    }, [setmap, location])

    function getLoc(){
        Axios.get(`https://us1.locationiq.com/v1/search.php?key=f79c1e405d9868&q=${location.street},${location.city},${location.country}&street=${location.street}&city=${location.city}&country=${location.country}&postalcode=${location.postal_code}&format=json`)
            .then(res => {
                let currLoc = Object.assign({}, location)
                currLoc.data = res.data
                setLocation(currLoc)
            })
        const MapComponent = withScriptjs(withGoogleMap(Map))
        setmap(
            <MapComponent 
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" 
                loadingElement={<div style={{ height: "100%"}}/>}
                containerElement={<div style={{ height: "100%"}}/>}
                mapElement={<div style={{height: "100%"}}/>}
            />
        )
        console.log(location.data[0].lat, location.data[0].lon)
    }

    function handleLocation(e){
        let currLoc = Object.assign(location)
        console.log(typeof(e.target.id))
        switch(e.target.id){
            case "country":
                currLoc.country = e.target.value
                break
            case "city":
                currLoc.city = e.target.value
                break
            case "street":
                currLoc.street = e.target.value
                break
            case "postal_code":
                currLoc.postal_code = e.target.value
                break
        }
        setLocation(currLoc)
        getLoc()
    }
    function Map() {
        return (
            <GoogleMap 
                defaultZoom={8}
                defaultCenter={{lat: Number(location.data[0].lat), lng: Number(location.data[0].lon)}}
            >
                <Marker key={location.data[0].display_name} position={{lat: Number(location.data[0].lat), lng: Number(location.data[0].lon)}}></Marker>
            </GoogleMap>
        )
    }

    function nextClick(){
        let radioBtn = document.querySelector("input[name='guestHave']:checked")
        console.log(radioBtn)
        if(radioBtn === undefined || radioBtn === null){
            alert('Please select what guest will have')
            return
        }
        if(location.city === "" || location.country === "" || location.street === "" || location.postal_code === "") return
        document.getElementById("outerBasics").style.transform = "scale(0.35)"
        setTimeout(() => {
            
            document.getElementById("placeHost").style.transform = "translateX(-100vw)"
        }, 500)
        setTimeout(() => {
            
            document.getElementById("PHSceneSection").style.transform = "scale(1)"
        }, 1300)
    }

    function comboBoxValidation(e){
        if(e.target.value === "-") alert('please select a type!')
    }

    function numberValidation(e){
        if(e.target.value < 0){
            e.target.value = 0
            alert('cannot be lowered than 0')
        }
    }

    function placeLocFormat(e){
        if((e.target.value + "").split(',').length > 1) return
        alert('must be on City, Country format') 
    }

    return(
        <div id="outerBasics"  style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/host-wallpaper/basics.jpg)" }}>
            <div id="PHBasicSection">
                <div className="basicSubSec">
                <h2>Basics</h2>
                    <div>
                        <div className="input">
                            <select name="" id="" placeholder=" " onChange={comboBoxValidation}>
                                <option value="-">--Place Type--</option>
                                <option value="House">House</option>
                                <option value="Apartemen">Apartement</option>
                                <option value="Beach House">Beach House</option>
                                <option value="Villa">Villa</option>
                                <option value="Summer House">Summer House</option>
                            </select>
                            <div className="label">Place Type</div>
                        </div>
                        <div className="input">
                            <input type="text" name="" id="" placeholder="City, Country" onBlur={placeLocFormat}/>
                            <div className="label">Place Location</div>
                        </div>
                        <div className="input">
                            <select name="" id="" placeholder=" " onChange={comboBoxValidation}>
                                <option value="-">--Property Type--</option>
                                <option value="A">Class A</option>
                                <option value="B">Class B</option>
                                <option value="C">Class C</option>
                            </select>
                            <div className="label">Property Type</div>
                        </div>
                        <div>
                            <h4>What Will Guest Have</h4>
                            <div id="guestHave">
                                <div>
                                    <input type="radio" name="guestHave" id="entire"/>
                                    <label htmlFor="entire">Entire Place</label>
                                </div>
                                <div>
                                    <input type="radio" name="guestHave" id="private"/>
                                    <label htmlFor="private">Private Room</label>
                                </div>
                                <div>
                                    <input type="radio" name="guestHave" id="shared"/>
                                    <label htmlFor="shared">Shared Room</label>
                                </div>
                            </div>
                        </div>
                        <div className="input">
                            <input type="number"  placeholder=" " name="" id="bedrooms" onChange={numberValidation}/>
                            <div className="label">Bedrooms</div>
                        </div>
                        <div className="input">
                            <input type="number"  placeholder=" " name="" id="beds" onChange={numberValidation}/>
                            <div className="label">Beds</div>
                        </div>
                        <div className="input">
                            <input type="number"  placeholder=" " name="" id="bathrooms" onChange={numberValidation}/>
                            <div className="label">Bathrooms</div>
                        </div>
                        <div id="map" style={{height: '50vh',width: '100%' }}>
                            {map}
                        </div>
                        <div className="input">
                            <input type="text" name="" id="country" onChange={handleLocation} onBlur={handleLocation} placeholder=" "/>
                            <div className="label">Country</div>
                        </div>
                        <div className="input">
                            <input type="text" name="" id="city" onChange={handleLocation} onBlur={handleLocation} placeholder=" "/>
                            <div className="label">City</div>
                        </div>
                        <div className="input">
                            <input type="text" name="" id="street" onChange={handleLocation} onBlur={handleLocation} placeholder=" "/>
                            <div className="label">Street</div>
                        </div>
                        <div className="input">
                            <input type="text" name="" id="postal_code" onChange={handleLocation} onBlur={handleLocation} placeholder=" "/>
                            <div className="label">Postal Code</div>
                        </div>
                        <div className="input">
                            <input type="button" value="Next" onClick={nextClick}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="basicsImage">
            </div>
        </div>
    )
}