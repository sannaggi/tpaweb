import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import GuestDropdown from '../layouts/GuestDropdown';
import '../../css/booking/bookingPage.css'
import StarReview from "../reusable/StarReview";
import axios from "axios";
import { Redirect } from "react-router-dom";

function BookingPage({booking, currency, user, history} : {booking: any, currency: any, user: any, history: any}) {

    const [redirect, setredirect] = useState()
    const [guests, setGuests] = useState(booking.guests)
    const [details, setdetails] = useState({
        name: null,
        image: null,
        averageRating: null,
        price: null,
        type: null,
        hostid: null
    })

    function getCurrency(price: number) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    function getGuestCount() {
        let count = 0;
        count = guests.adults + guests.children
        return count === 1? count + " guest" : count + " guests"
    }
    
    function getInfantsCount() {
        let count = guests.infants
        return count === 1? count + " infants" : count + " infants"
    }

    function getDateFormat(dates) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return `${monthNames[parseInt(dates[1]) - 1]} ${dates[2]}, ${dates[0]}`

    }

    function getCheckInOut() {
        const checkIn: string = booking.checkIn
        const checkOut: string = booking.checkOut
        const checkInDates = checkIn.split("-")
        const checkOutDates = checkOut.split("-")
        return getDateFormat(checkInDates) + " -> " + getDateFormat(checkOutDates)
    }

    useEffect(() => {
        let b: any = booking.booking
        setdetails({
            name: b.name,
            image: b.image,
            averageRating: b.averagerating ,
            price: b.price,
            type: b.type,
            hostid: b.hostid
        })
    }, [booking.booking])

    function multiply(a: number, b: number) {
        return a * b
    }

    function getTotalDaysStayed() {
        const checkin = new Date(booking.checkIn)
        const checkout = new Date(booking.checkOut)
        const diffTime = Math.abs(checkout.getTime() - checkin.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    function getTotal() {
        const b = booking.booking
        if(b.type === "place") return ((multiply(b.price, guests.adults + guests.children) + multiply(b.price / 2, guests.infants)) * getTotalDaysStayed())
        return multiply(b.price, guests.adults + guests.children) + multiply(b.price / 2, guests.infants)
    }

    function getTodaysDate() {
        const d = new Date()
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    }

    function onClick(status: string) {
        axios({
            url: "https://aivbnbapi.herokuapp.com/api/booking",
            method: "POST",
            data: {
                userid: user.id,
                name: details.name,
                date: getTodaysDate(),
                total: getTotal(),
                type: details.type,
                status: status,
                hostid: details.hostid
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(_ => {
            if(status === "postponed") {
                history.go(-1)
                return
            }
            setredirect(<Redirect to="/"/>)
        })
    }

    function getTotalDetail() {
        if(details.type === "place") 
            return `(${getCurrency(booking.booking.price)} x ${getGuestCount()} + ${getCurrency(booking.booking.price / 2)} x ${getInfantsCount()}) x ${getTotalDaysStayed()} night(s)`
        return `${getCurrency(booking.booking.price)} x ${getGuestCount()} + ${getCurrency(booking.booking.price / 2)} x ${getInfantsCount()}`
    }

    return (
        <main className="booking-page-container">
            {console.log(booking)}
            {redirect}
            <div className="left">
                <div className="header">
                    <h1>Review and pay</h1>
                    <div className="add-more">
                        <img src="/diamond.gif" alt=""/>
                        <p>You can add more friends to this experience and confirm your reservation.</p>
                    </div>
                </div>
                <div className="coming">
                    <h2>Who's coming?</h2>
                    <h4>Guests</h4>
                    <GuestDropdown guests={guests} setGuests={setGuests}/>
                </div>
                <div className="confirmation">
                    <button className="green-button" onClick={() => onClick("confirmed")}>Agree and continue</button>
                    <div onClick={() => onClick("postponed")}>Postpone</div>
                </div>
            </div>
            <div className="right">
                <div className="section header">
                    <div className="detail">
                        <h4>{details.name}</h4>
                        <div>
                            <StarReview greenStar={{
                                width: "calc(100% * (" + details.averageRating + " / 5))",
                                overflow: "hidden",
                            }}/>
                            <div>{details.averageRating}</div>
                        </div>
                    </div>
                    <div className="image" style={{backgroundImage: `url(${details.image})`}}></div>
                </div>
                <div className="section booking-details">
                    <div className="row"><span className="icon"><i className='fa fa-users'></i></span>{getGuestCount()}</div>
                    <div className="row"><span className="icon"><i className='fa fa-calendar'></i></span>{getCheckInOut()}</div>                    
                </div>
                <div className="section">
                    <div className="row price-row">
                        <div>{getTotalDetail()}</div>
                        <div>{getCurrency(getTotal())}</div>
                    </div>
                    <div className="row price-row">
                        <div>Cleaning fee</div>
                        <div>{getCurrency(0)}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="row price-row">
                        <div><strong>Total{`(${currency.symbol})`}</strong></div>
                        <div><strong>{getCurrency(getTotal())}</strong></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = (state: any) => ({
    booking: state.bookings.item,
    currency: state.currency.item,
    user: state.user.item
})

export default connect(mapStateToProps, {})(BookingPage)