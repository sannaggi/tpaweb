import React, { useState } from 'react'
import { connect } from 'react-redux';
import axios from "axios";

function Booking({booking, currency} : {booking: any, currency: any}) {

    const [status, setstatus] = useState(booking.status)
    const [rating, setrating] = useState(booking.rating)
    const [hostrating, sethostrating] = useState(booking.hostrating)

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

    function setStar(data: any) {
        axios({
            url: "https://aivbnbapi.herokuapp.com/api/booking/" + booking.id,
            method: "POST",
            data: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    function onStarClick(isHost: boolean, val: number) {
        if(isHost && hostrating === 0){
            sethostrating(val)
            setStar({
                type: "hostrating",
                rating: val
            })
        } 
        else if(!isHost && rating === 0){
            setrating(val)
            setStar({
                type: "rating",
                rating: val
            })
        }
    }

    function getStatic(isHost: boolean) {
        if(isHost && hostrating !== 0) return "static"
        if(!isHost && rating !== 0) return "static"
        return ""
    }

    function getStars(isHost: boolean) {
        let t = [];
        for(let i = 1; i <= 5; i++) {
            if((isHost && i <= hostrating) || (!isHost && i <= rating)) t.push(<span className="star" onClick={() => {}} style={{color: "rgb(238, 182, 0)"}}>&#9733;</span>)
            else t.push(<span className="star" onClick={() => onStarClick(isHost, 6-i)} key={i}>&#9733;</span>)
        }
        return t
    }
    
    function getRating() {
        if(status === 'canceled') return null
        return <React.Fragment>
            <div className="rating-container">
            <div className="grid">Rating:</div>
            <div className={"grid star-grid " + getStatic(false)}>
                {getStars(false)}
            </div>
            </div>
            <div className="rating-container">
                <div className="grid">Host Rating:</div>
                <div className={"grid star-grid " + getStatic(true)}>
                    {getStars(true)}
                </div>
            </div>
        </React.Fragment>
    }

    return (
        <div className="booking-card">
            {getIcon()}
            <div className="detail">
                <div className="row top">
                    {getDate()}
                    {getTotal()}
                    {getType()}
                    {getStatus()}
                    {getCancel()}
                </div>
                <div className="row bottom">
                    {getRating()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item,
    user: state.user.item
})

export default connect(mapStateToProps, {})(Booking)
