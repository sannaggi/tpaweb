import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { setGuestCount } from "../../actions/guestCountActions";

function GuestDropdown({setGuestCount} : {setGuestCount:any}) {

    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0
    })

    useEffect(() => {
        setGuestCount(guests);
    }, [guests, setGuestCount])

    const [click, setClick] = useState(false)

    function getVisible() {
        const arrow = document.getElementById("arrow");
        if(!click) {
            if(arrow) arrow.classList.replace('fa-angle-up', 'fa-angle-down');
            return {height: '0px', padding: '0 2em'}
        }
        if(arrow) arrow.classList.replace('fa-angle-down', 'fa-angle-up');
        return {height: '270px', padding: '2em'}

    }

    function getBorder() {
        if(click) return {border: '0.8px solid rgb(14, 97, 55)'}
        else return {border: '0.8px solid rgb(192, 192, 192)'}
    }

    function count(e:any){
        let change;
        let classname = e.target.className;
        let type = classname.substring(classname.lastIndexOf(" ") + 1);
        if(classname.includes('minus')) change = -1;
        else change = 1;
        if(type === 'adults'){
            setGuests({...guests, adults: guests.adults + change < 0 ? 0 : guests.adults + change
            })
        }
        else if(type === 'children'){
            setGuests({...guests, children: guests.children + change < 0 ? 0 : guests.children + change
            })
        }
        else{
            setGuests({...guests, infants: guests.infants + change < 0 ? 0 : guests.infants + change
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

    return (
        <div>
            <div className="guestContainer">
                <div className="guestInput" onClick={() => {setClick(!click)}} style={getBorder()}>
                    <input type="text" disabled name="" placeholder={getGuestSummary()}/>
                    <i className="fa fa-angle-down" id="arrow"></i>
                </div>
                <div className="guestInputContent" style={getVisible()}>
                    <div className="guestType">
                        <span className="typeTitle">Adults</span>
                        <div>
                            <span className="counterBtn minus adults" onClick={count}>-</span>
                            <span className="adultCounter counter">{guests.adults}</span>
                            <span className="counterBtn plus adults" onClick={count}>+</span>
                        </div>
                    </div>
                    <div className="guestType">
                        <span className="typeTitle">Children</span>
                        <div>
                            <span className="counterBtn minus children" onClick={count}>-</span>
                            <span className="childrenCounter counter">{guests.children}</span>
                            <span className="counterBtn plus children" onClick={count}>+</span>
                        </div>
                    </div>
                    <div className="guestType">
                        <span className="typeTitle">Infants</span>
                        <div>
                            <span className="counterBtn minus infants" onClick={count}>-</span>
                            <span className="infantsCounter counter">{guests.infants}</span>
                            <span className="counterBtn plus infants" onClick={count}>+</span>
                        </div>
                    </div>
                    <span className="apply" onClick={() => setClick(!click)}>Apply</span>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { setGuestCount })(GuestDropdown)
