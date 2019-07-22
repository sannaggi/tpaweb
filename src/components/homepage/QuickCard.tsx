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

    function onChange(e:any) {
        setNewBooking({...newBooking, [e.target.name] : e.target.value});
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
                <input type="date" name="checkIn" id="" value={newBooking.checkIn} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-OUT</div>
                <input type="date" name="checkOut" id="" value={newBooking.checkOut} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input">
                <div className="title">GUESTS</div>
                <div className="guestContainer">
                    <input className="guestInput" type="text" disabled name="" id="" placeholder="Guests"/>
                    <div className="guestInputContent">
                        <div className="guestType">
                            <span className="typeTitle">Adults</span>
                            <div>
                                <span className="counterBtn minus adults">-</span>
                                <span className="adultCounter counter">0</span>
                                <span className="counterBtn plus adults">+</span>
                            </div>
                        </div>
                        <div className="guestType">
                            <span className="typeTitle">Children</span>
                            <div>
                                <span className="counterBtn minus children">-</span>
                                <span className="childrenCounter counter">0</span>
                                <span className="counterBtn plus children">+</span>
                            </div>
                        </div>
                        <div className="guestType">
                            <span className="typeTitle">Infants</span>
                            <div>
                                <span className="counterBtn minus infants">-</span>
                                <span className="infantsCounter counter">0</span>
                                <span className="counterBtn plus infants">+</span>
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
