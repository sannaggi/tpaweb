import React, { useState, useEffect } from 'react'
import '../../css/homepage/quickcard.css'
import { connect } from 'react-redux';
import { newPost } from '../../actions/bookingActions'
import GuestDropdown from '../layouts/GuestDropdown'

function QuickCard({guestCount} : {guestCount:Object}) {

    const [newBooking, setNewBooking] = useState({
        place: "",
        checkIn: "",
        checkOut: "",
        guests: {}
    })

    useEffect(() => {
        newBooking.guests = guestCount
    }, [guestCount, newBooking.guests])

    function onChange(e:any) {
        setNewBooking({...newBooking, [e.target.name] : e.target.value});
    }

    return (
        <div className="quickCard">
            <div className="quickCardTitle">Book unique places to stay and things to do.</div>
            <div className="input">
                <div className="title">WHERE</div>
                <input type="text" name="place" value={newBooking.place} onChange={onChange} placeholder="Anywhere"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-IN</div>
                <input type="date" name="checkIn" onKeyDown={(e) => {e.preventDefault()}} value={newBooking.checkIn} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-OUT</div>
                <input type="date" name="checkOut" onKeyDown={(e) => {e.preventDefault()}} value={newBooking.checkOut} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input">
                <div className="title">GUESTS</div>
                <GuestDropdown />
            </div>
            <input type="submit" value="Search"/>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    guestCount: state.guestCount.item
})

export default connect(mapStateToProps, { newPost })(QuickCard);
