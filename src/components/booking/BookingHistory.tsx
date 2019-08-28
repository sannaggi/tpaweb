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
    }, [])

    return (
        <main className="history-container">
            <div className="title"><h1>Booking History</h1></div>
            <Bookings bookings={bookings}/>
        </main>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {})(BookingHistory)
