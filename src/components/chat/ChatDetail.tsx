import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import "../../css/chat/chatDetail.css";
import ChatMessage from "./ChatMessage";

function ChatDetail({currency, user, otherUser, messages} : {currency:any, user: any, otherUser: any, messages:any}) {

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    function getHostProfile() {
        {/* TODO: validate which user is host */}
        const host = otherUser
        return <div className="host-profile section">
            <img src={host.profileimage} className="profile-image" alt=""/>
            <div><strong>{host.firstname}</strong></div>
            <div className="small-detail">host_location</div>
            <div className="small-detail">total_review</div>
        </div>
    }

    function getCheckInOut() {
        return <div className="check-in-out section">
            <div>
                <div className="title">Check in</div>
                <div><strong>date_placeholder</strong></div>
            </div>
            <div className="big-more-than">
                >
            </div>
            <div>
                <div className="title">Check out</div>
                <div><strong>date_placeholder</strong></div>
            </div>
        </div>
    }

    function getGuests() {
        return <div className="section">
            <div className="title">Guests</div>
            <div>x adults, y childrens</div>
        </div>
    }

    function getConfirmationCode() {
        return <div className="section">
            <div className="title">Confirmation code</div>
            <div>saidvufa2174yt1312</div>
        </div>
    }

    function getAddress() {
        return <div className="section">
            <div className="title">Address</div>
            <div className="address">Alalalala</div>
        </div>
    }

    function getPaymentDetails() {
        // TODO: change placeholder into the real thing
        return <div className="section payment">
            <div className="payment-title"><h3>Payment</h3></div>
            <div className="payment-detail">
                <div>{getCurrency(67)} x 6 nights</div>
                <div>{getCurrency(67*6)}</div>
            </div>
            <div className="payment-detail">
                <div>Cleaning fee</div>
                <div>{getCurrency(20)}</div>
            </div>
            <div className="payment-detail">
                <div>Service fee</div>
                <div>{getCurrency(0)}</div>
            </div>
            <hr/>
            <div className="payment-detail">
                <div><strong>Total</strong></div>
                <div>{getCurrency(422)}</div>
            </div>
        </div>
    }

    function getDetails() {
        return <div className="details">
            {getHostProfile()}
            {getCheckInOut()}
            {getGuests()}
            {getConfirmationCode()}
            {getAddress()}
            {getPaymentDetails()}
        </div>
    }

    return (
        <main className="chat-detail-container">
            {getDetails()}
            <ChatMessage user={user} otherUser={otherUser} messages={messages}/>
        </main>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
    currency: state.currency.item
})

export default connect(mapStateToProps, {})(ChatDetail)
