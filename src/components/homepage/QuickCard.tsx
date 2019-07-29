import React, { useState, useEffect } from 'react'
import '../../css/homepage/quickcard.css'
import { connect } from 'react-redux';
import { newPost } from '../../actions/bookingActions'
import GuestDropdown from '../layouts/GuestDropdown'
import axios from 'axios'
import SearchResult from './SearchResult'

function QuickCard({guestCount} : {guestCount:Object}) {

    const [newBooking, setNewBooking] = useState({
        place: "",
        checkIn: "",
        checkOut: "",
        guests: {},
        booking: {
            name: ""
        }
    })

    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        newBooking.guests = guestCount
    }, [guestCount, newBooking.guests])

    function onChange(e:any) {
        setNewBooking({...newBooking, [e.target.name] : e.target.value});
    }

    async function takeData(res) {
        return new Promise((resolve) => {
            resolve(res.data)
        })
    }

    function getLogo(type:string) {
        if(type === "place") return <span><i className="fa fa-home"></i></span>
        return  <span>&#10070;</span>
    }

    function onClick(data) {
        setNewBooking({...newBooking, booking: {...data}})
        setSearchResult([])
    }

    function search(e:any) {
        setNewBooking({...newBooking, booking: {...newBooking.booking, name: e.target.value}})
        if(e.target.value === "") {
            setSearchResult([])
            return
        }
        axios.get("https://aivbnbapi.herokuapp.com/api/search/" + e.target.value, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then((datas:Array<any>) => {
            if(datas === null || datas === undefined) {
                setSearchResult([<li key="xxxxx">No matching data found</li>])
                return
            }
            setSearchResult(datas.map((data) => (
                <SearchResult key={data.id} data={data} onClick={onClick} getLogo={getLogo}/>
            )))
        })
    }

    return (
        <div className="quickCard">
            <div className="quickCardTitle">Book unique places to stay and things to do.</div>
            <div className="input">
                <div className="title">WHERE</div>
                <input type="search" id="searchBox" name="place" value={newBooking.booking.name} onChange={search} placeholder="Anywhere"/>
                <ul className="search-container">
                    {searchResult}
                </ul>
            </div>
            <div className="input half">
                <div className="title">CHECK-IN</div>
                <input type="date" name="checkIn" onKeyDown={(e) => {e.preventDefault()}} value={newBooking.checkIn} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input half">
                <div className="title">CHECK-OUT</div>
                <input type="date" name="checkOut" onKeyDown={(e) => {e.preventDefault()}} value={newBooking.checkOut} onChange={onChange} placeholder="mm/dd/yy"/>
            </div>
            <div className="input" id="quickcard-guest">
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
