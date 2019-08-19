import React, { useEffect, useState } from 'react'
import '../../css/experiences/experiences.css'
import { fetchFilteredExperiences } from "../../actions/experienceActions";
import { connect } from 'react-redux';
import GuestCounter from '../layouts/GuestCounter';
import '../../css/guestDropdown.css'
import PriceFilter from "./PriceFilter";
import LanguageFilter from "./LanguageFilter";
import ExperienceCard from "./ExperienceCard";

function Experiences({ experiences, fetchFilteredExperiences } : { experiences:Array<any>, fetchFilteredExperiences:Function}) {
    
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0
    })

    const [lowerPrice, setLowerPrice] = useState(1)
    const [upperPrice, setUpperPrice] = useState(999)
    const [languages, setLanguages] = useState(["English", "German", "Italian", "Bahasa", "Japanese", "Korean", "Chinese", "Spanish"])

    const [guestsClick, setGuestsClick] = useState(false)
    const [priceClick, setPriceClick] = useState(false)
    const [languageClick, setLanguageClick] = useState(false)

    useEffect(() => {
        if(!guestsClick && !priceClick && !languageClick) {
            fetchFilteredExperiences({
                guests: guests.adults + guests.children,
                lowerprice: lowerPrice,
                upperprice: upperPrice,
                languages: languages
            })
        }
        
    }, [fetchFilteredExperiences, guestsClick, priceClick, languageClick, guests, lowerPrice, upperPrice, languages])

    function getGuestsVisible() {
        if(!guestsClick) {
            return {height: '0px', padding: '0 2em'}
        }
        return {height: '240px', padding: '1em 2em'}
    }
    
    function getPriceVisible() {
        if(!priceClick) {
            return {height: '0px', padding: '0 1.5em'}
        }
        return {height: '190px', padding: '1.5em'}
    }

    function getLanguagesVisible() {
        if(!languageClick) {
            return {height: '0px', padding: '0 1.5em'}
        }
        return {height: '230px', padding: '1.5em'}
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
            if(guests.adults !== 0)
                setGuests({...guests, children: guests.children + change < 0 ? 0 : guests.children + change
                })
            else 
            setGuests({...guests, children: guests.children + change < 0 ? 0 : guests.children + change
                , adults: 1
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
            case "price":
                if(lowerPrice !== 1 || upperPrice !== 999) {
                    return { backgroundColor: "rgb(9, 142, 151)", color: "#fff"}
                }
                break;
            case "language":
                if(JSON.stringify(["English", "German", "Italian", "Bahasa", "Japanese", "Korean", "Chinese", "Spanish"]) !== JSON.stringify(languages))
                    return { backgroundColor: "rgb(9, 142, 151)", color: "#fff"}
                break;
            default:
                break;
        }
    }

    function onClick(category) {
        switch (category) {
            case "guests":
                setGuestsClick(!guestsClick)
                setPriceClick(false)
                setLanguageClick(false)
                break;
            case "price":
                setPriceClick(!priceClick)
                setGuestsClick(false)
                setLanguageClick(false)
                break;
            case "language":
                setLanguageClick(!languageClick)
                setPriceClick(false)
                setGuestsClick(false)
                break;
            default:
                break;
        }
    }

    function getExperiences() {
        if(experiences === null)
            return <div className="none">No experiences available with this criteria</div>

        return experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience}/>
        ))
    }
    
    function getLangCount() {
        if(JSON.stringify(["English", "German", "Italian", "Bahasa", "Japanese", "Korean", "Chinese", "Spanish"]) !== JSON.stringify(languages)){
            return <React.Fragment><span id="bullet"> &#183; </span>{languages.length}</React.Fragment>
        }
    }

    return (
        <React.Fragment>
            <div className="filterBar">
                <button>Dates</button>
                <div className="filterCategory">
                    <button style={getStyle("guests")} onClick={() => onClick("guests")}>{getGuestSummary()}</button>
                    <GuestCounter getVisible={getGuestsVisible} count={count} guests={guests} setClick={setGuestsClick} click={guestsClick}/>
                </div>
                <div className="filterCategory">
                    <button style={getStyle("price")} onClick={() => onClick("price")}>Price</button>
                    <PriceFilter priceClick={priceClick} setPriceClick={setPriceClick} getPriceVisible={getPriceVisible} lowerprice={lowerPrice} upperprice={upperPrice} setLowerPrice={setLowerPrice} setUpperPrice={setUpperPrice}/>
                </div>
                <button>Time of day</button>
                <div className="filterCategory">
                    <button style={getStyle("language")} onClick={() => onClick("language")}>Language offered{getLangCount()}</button>
                    <LanguageFilter getLanguagesVisible={getLanguagesVisible} setLanguageClick={setLanguageClick} languageClick={languageClick} languages={languages} setLanguages={setLanguages}/>
                </div>
            </div>
            <div className="experienceContainer">
                {getExperiences()}
            </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    experiences: state.experiences.items
})

export default connect(mapStateToProps, { fetchFilteredExperiences })(Experiences)
