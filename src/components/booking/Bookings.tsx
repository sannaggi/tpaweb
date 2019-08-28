import React from 'react'
import Booking from "./Booking";

function Bookings({bookings} : {bookings: any}) {
    return (
        <div className="bookings-container">
            {bookings.map((booking: any) => (
                <Booking booking={booking} key={booking.id}/>
            ))}
        </div>
    )
}

export default Bookings
