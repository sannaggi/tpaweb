import React, { useState } from 'react'
import { connect } from 'react-redux';
import GuestCounter from "./GuestCounter";

function GuestDropdown({guests, setGuests} : {guests:any, setGuests: any}) {

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

    return (
        <div>
            <div className="guestContainer">
                <div className="guestInput" onClick={() => {setClick(!click)}} style={getBorder()}>
                    <input type="text" disabled name="" placeholder={getGuestSummary()}/>
                    <i className="fa fa-angle-down" id="arrow"></i>
                </div>
                <GuestCounter getVisible={getVisible} count={count} guests={guests} setClick={setClick} click={click}/>
            </div>
        </div>
    )
}

export default connect(null, { })(GuestDropdown)
