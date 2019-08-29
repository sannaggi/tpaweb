import React, { useEffect, useState } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import Bookings from "./Bookings";
import '../../css/booking/bookingHistory.css'

function BookingHistory({user} : {user: any}) {

    const [bookings, setbookings] = useState([])

    useEffect(() => {
        axios.get("https://aivbnbapi.herokuapp.com/api/booking/u/" + user.id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => setbookings(data.data))
    }, [user.id])

    function getBookings() {
        if(bookings === null || bookings.length === 0) return <div style={{textAlign: "center", marginTop: "80px"}}><h2>You have no bookings history yet</h2></div>
        return <Bookings bookings={bookings}/>
    }

    return (
        <main className="history-container">
            <div className="title"><h1>Booking History</h1></div>
            {getBookings()}
        </main>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {})(BookingHistory)
