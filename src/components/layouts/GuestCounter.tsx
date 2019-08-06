import React from 'react'

function GuestCounter({ getVisible, count, guests, setClick, click } : { getVisible: Function, count: any, guests:any, setClick: Function, click:any}) {
    return (
        <div className="guestInputContent" style={getVisible()}>
            <div className="guestType">
                <span className="typeTitle">Adults</span>
                <div>
                    <span className="counterBtn minus adults" onClick={count}>-</span>
                    <span className="adultCounter counter">{guests.adults}</span>
                    <span className="counterBtn plus adults" onClick={count}>+</span>
                </div>
            </div>
            <div className="guestType">
                <span className="typeTitle">Children</span>
                <div>
                    <span className="counterBtn minus children" onClick={count}>-</span>
                    <span className="childrenCounter counter">{guests.children}</span>
                    <span className="counterBtn plus children" onClick={count}>+</span>
                </div>
            </div>
            <div className="guestType">
                <span className="typeTitle">Infants</span>
                <div>
                    <span className="counterBtn minus infants" onClick={count}>-</span>
                    <span className="infantsCounter counter">{guests.infants}</span>
                    <span className="counterBtn plus infants" onClick={count}>+</span>
                </div>
            </div>
            <span className="apply" onClick={() => setClick(!click)}>Apply</span>
        </div>
    )
}

export default GuestCounter
