import React from 'react'
import '../../css/homepage/quickcard.css'

function QuickCard() {
    return (
        <div className="quickCard">
            <div className="quickCardTitle">Book unique places to stay and things to do.</div>
            <div className="input">
                <div className="title">WHERE</div>
                <input type="text" name="" id="" placeholder="Anywhere"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-IN</div>
                <input type="text" name="" id="" placeholder="mm/dd/yy"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-OUT</div>
                <input type="text" name="" id="" placeholder="mm/dd/yy"/>
            </div>
            <div className="input">
                <div className="title">GUESTS</div>
                <input type="text" name="" id="" placeholder="Guests"/>
            </div>
            <input type="submit" value="Search"/>
        </div>
    )
}

export default QuickCard
