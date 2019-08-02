import React, { useEffect, useState } from 'react'
import '../../css/experiences/experiences.css'
import { fetchFilteredExperiences } from "../../actions/experienceActions";
import { connect } from 'react-redux';
import FavoriteButton from "../layouts/FavoriteButton";
import { Link } from 'react-router-dom';
import GuestCounter from '../layouts/GuestCounter';
import '../../css/guestDropdown.css'

function Experiences({ experiences, fetchFilteredExperiences, currency } : { experiences:Array<any>, fetchFilteredExperiences:Function, currency:any }) {
    
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0
    })

    const [lowerPrice, setLowerPrice] = useState(1)
    const [upperPrice, setUpperPrice] = useState(9999)
    const [languages, setLanguages] = useState(["English", "German", "Italian", "Bahasa", "Japanese", "Korean", "Chinese"])

    const [guestsClick, setGuestsClick] = useState(false)
    
    useEffect(() => {
        if(!guestsClick) {
            fetchFilteredExperiences({
                guests: guests.adults + guests.children,
                lowerprice: lowerPrice,
                upperprice: upperPrice,
                languages: languages
            })
        }
        
    }, [fetchFilteredExperiences, guestsClick, guests, lowerPrice, upperPrice, languages])

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }
    
    function getAmenities(amenities) {
        let str = amenities[0].type;
        if(amenities[1].type !== undefined) str += ", " + amenities[1].type;
        return str
    }

    function getGuestsVisible() {
        if(!guestsClick) {
            return {height: '0px', padding: '0 2em'}
        }
        return {height: '240px', padding: '1em 2em'}

    }
    
    function count(e:any){
        let change;
        let classname = e.target.className;
        let type = classname.substring(classname.lastIndexOf(" ") + 1);
        if(classname.includes('minus')) change = -1;
        else change = 1;
        if(type === 'adults'){
            if(change === 1 || (guests.adults > 1 && change === -1))
                setGuests({...guests, adults: guests.adults + change < 0 ? 0 : guests.adults + change
                })
        }
        else if(type === 'children'){
            setGuests({...guests, children: guests.children + change < 0 ? 0 : guests.children + change
            })
        }
        else{
            if(guests.adults !== 0)
                setGuests({...guests, infants: guests.infants + change < 0 ? 0 : guests.infants + change
                })
            else 
                setGuests({...guests, infants: guests.infants + change < 0 ? 0 : guests.infants + change
                    , adults: 1
                })
        }
    }

    function getGuestSummary():string {
        if(!guests.adults && !guests.children && !guests.infants)
            return "Guests"
        else{
            let summary:string = "";

            let count = guests.adults + guests.children
            if(count === 1) summary = count + " guest"
            else if(count > 1) summary = count + " guests"

            if(guests.infants === 1) summary += ", " + guests.infants + " infant"
            else if(guests.infants > 1) summary += ", " + guests.infants + " infants"

            return summary;
        }
    }

    function getStyle(category) {
        switch (category) {
            case "guests":
                if(guests.adults !== 0 || guests.children !== 0 || guests.infants !== 0) {
                    return { backgroundColor: "rgb(9, 142, 151)", color: "#fff"}
                }
                break;
        
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <div className="filterBar">
                <button>Dates</button>
                <div className="filterCategory">
                    <button style={getStyle("guests")} onClick={() => setGuestsClick(!guestsClick)}>{getGuestSummary()}</button>
                    <GuestCounter getVisible={getGuestsVisible} count={count} guests={guests} setClick={setGuestsClick} click={guestsClick}/>
                </div>
                <button>Price</button>
                <button>Time of day</button>
                <button>Language offered</button>
            </div>
            <div className="experienceContainer">
                {experiences.map((experience) => (
                    <Link key={experience.id} to={`/experiences/${experience.id}`} target="_blank">
                        <div className="experienceCard">
                            <FavoriteButton />
                            <div className="experience-image" style={{backgroundImage: "url(" + experience.headerimage + ")"}}></div>
                            <div className="card-title">{experience.name}</div>
                            <div className="card-category">From {getCurrency(experience.price)}/person &#183; {experience.duration} hours &#183; {getAmenities(experience.amenities)} included</div>
                            <div><span className="card-rating">{experience.averagerating}</span><span className="star">&#9733;</span><span className="card-review"> ({experience.totalrating})</span></div>
                        </div>
                    </Link>
                ))}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    experiences: state.experiences.items,
    currency: state.currency.item
})

export default connect(mapStateToProps, { fetchFilteredExperiences })(Experiences)
