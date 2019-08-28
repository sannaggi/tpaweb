import React, { useState } from 'react'
import { connect } from 'react-redux';
import axios from "axios";

function Booking({booking, currency} : {booking: any, currency: any}) {

    const [status, setstatus] = useState(booking.status)

    function uppercase(string) {
        return string[0].toUpperCase() + string.slice(1)
    }

    function getCurrency(price: number) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    function getIcon() {
        if(booking.type === 'place') return <div className="icon"><i className="fa fa-home"></i></div>
        return  <div className="icon">&#10070;</div>
    }

    function getDate() {
        return  <div className="col">{booking.date}</div>
    }

    function getTotal() {
        return <div className="col">{getCurrency(booking.total)}</div>
    }

    function getType() {
        return <div className="col">{uppercase(booking.type)}</div>
    }

    function getStatus() {
        let color = 'green'
        if(status === 'postponed') color = 'rgb(238, 182, 0)'
        else if(status === 'canceled') color = 'red'
        return <div className="col" style={{color: color}}>{uppercase(status)}</div>
    }

    function onClick() {
        setstatus('canceled')
        axios({
            url: "https://aivbnbapi.herokuapp.com/api/booking/c/" + booking.id,
            method: "POST",
            data: {
                status: "canceled"
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    function getCancel() {
        if(status === 'confirmed' || status === 'canceled') return
        return <div className="col red"><span onClick={onClick}>Cancel</span></div>
    }

    return (
        <div className="booking-card">
            <div className="top">
                {getIcon()}
                {getDate()}
                {getTotal()}
                {getType()}
                {getStatus()}
                {getCancel()}
            </div>
            <div className="bottom">
                
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item,
    user: state.user.item
})

export default connect(mapStateToProps, {})(Booking)
