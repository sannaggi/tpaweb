import React, { useState } from 'react'
import '../../css/homepage/quickcard.css'
import { connect } from 'react-redux';
import { newPost } from '../../actions/bookingActions'

function QuickCard() {

    const [newBooking, setNewBooking] = useState({
        place: "",
        checkIn: "",
        checkOut: "",
        guests: {
            adults: 0,
            children: 0,
            infants: 0
        }
    })

    const [click, setClick] = useState(false)

    function onChange(e:any) {
        setNewBooking({...newBooking, [e.target.name] : e.target.value});
    }

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
            setNewBooking({...newBooking, guests: {
                ...newBooking.guests, adults: newBooking.guests.adults + change < 0 ? 0 : newBooking.guests.adults + change
            }})
        }
        else if(type === 'children'){
            setNewBooking({...newBooking, guests: {
                ...newBooking.guests, children: newBooking.guests.children + change < 0 ? 0 : newBooking.guests.children + change
            }})
        }
        else{
            setNewBooking({...newBooking, guests: {
                ...newBooking.guests, infants: newBooking.guests.infants + change < 0 ? 0 : newBooking.guests.infants + change
            }})
        }

    }

    return (
        <div className="quickCard">
            <div className="quickCardTitle">Book unique places to stay and things to do.</div>
            <div className="input">
                <div className="title">WHERE</div>
                <input type="text" name="place" id="" value={newBooking.place} onChange={onChange} placeholder="Anywhere"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-IN</div>
                <input type="date" name="checkIn" onKeyDown={(e) => {e.preventDefault()}} id="" value={newBooking.checkIn} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-OUT</div>
                <input type="date" name="checkOut" onKeyDown={(e) => {e.preventDefault()}} id="" value={newBooking.checkOut} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input">
                <div className="title">GUESTS</div>
                <div className="guestContainer">
                    <div className="guestInput" onClick={() => {setClick(!click)}} style={getBorder()}>
                        <input type="text" disabled name="" id="" placeholder="Guests"/>
                        <i className="fa fa-angle-down" id="arrow"></i>
                    </div>
                    <div className="guestInputContent" style={getVisible()}>
                        <div className="guestType">
                            <span className="typeTitle">Adults</span>
                            <div>
                                <span className="counterBtn minus adults" onClick={count}>-</span>
                                <span className="adultCounter counter">{newBooking.guests.adults}</span>
                                <span className="counterBtn plus adults" onClick={count}>+</span>
                            </div>
                        </div>
                        <div className="guestType">
                            <span className="typeTitle">Children</span>
                            <div>
                                <span className="counterBtn minus children" onClick={count}>-</span>
                                <span className="childrenCounter counter">{newBooking.guests.children}</span>
                                <span className="counterBtn plus children" onClick={count}>+</span>
                            </div>
                        </div>
                        <div className="guestType">
                            <span className="typeTitle">Infants</span>
                            <div>
                                <span className="counterBtn minus infants" onClick={count}>-</span>
                                <span className="infantsCounter counter">{newBooking.guests.infants}</span>
                                <span className="counterBtn plus infants" onClick={count}>+</span>
                            </div>
                        </div>
                        <span className="apply">Apply</span>
                    </div>
                </div>
            </div>
            <input type="submit" value="Search"/>
        </div>
    )
}

export default connect(null, { newPost })(QuickCard);
