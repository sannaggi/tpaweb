import React, { useState, useEffect } from 'react'
import '../../css/homepage/quickcard.css'
import { connect } from 'react-redux';
import { book } from '../../actions/bookingActions'
import GuestDropdown from '../layouts/GuestDropdown'
import axios from 'axios'
import SearchResult from './SearchResult'
import { Redirect } from "react-router-dom";

function QuickCard({book} : {book: any}) {

    const [newBooking, setNewBooking] = useState({
        checkIn: "",
        checkOut: "",
        guests: {},
        booking: {
            name: ""
        },
    })

    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0
    })

    const [dateToday, setDateToday] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [checkoutMinDate, setCheckoutMinDate] = useState()
    const [redirect, setredirect] = useState()

    useEffect(() => {
        getDateToday()
    }, [])

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

    function getDateToday() {
        var today:any = new Date();
        var dd:any = today.getDate();
        var mm:any = (today.getMonth()+1);
        var yyyy = today.getFullYear();
        if(dd<10){
                dd = '0' + dd
            } 
            if(mm<10){
                mm = '0' + mm
            } 
        today = yyyy + '-' + mm + '-' + dd;
        setDateToday(today)
        setCheckoutMinDate(today)
    }

    function onCheckinChange(e) {
        setCheckoutMinDate(e.target.value)
        onChange(e)
    }

    function onSubmit(e) {
        e.preventDefault()
        newBooking.guests = guests
        book(newBooking)
        if(newBooking.booking.name === "") {
            alert("Please search for proper location")
            return
        }
        if(newBooking.checkIn === "" || newBooking.checkOut === "") {
            alert("Please insert booking dates")
            return
        }
        setredirect(<Redirect push to="/booking/new"/>)
    }

    return (
        <div className="quickCard">
            {redirect}
            <div className="quickCardTitle">Book unique places to stay and things to do.</div>
            <form autoComplete='off' action="" onSubmit={onSubmit}>
                <div className="input">
                    <div className="title">WHERE</div>
                    <input autoComplete="off" autoFocus type="search" id="searchBox" name="place" value={newBooking.booking.name} onChange={search} placeholder="Anywhere"/>
                    <ul className="search-container">
                        {searchResult}
                    </ul>
                </div>
                <div className="input half">
                    <div className="title">CHECK-IN</div>
                    <input type="date" name="checkIn" min={dateToday} onKeyDown={(e) => {e.preventDefault()}} value={newBooking.checkIn} onChange={onCheckinChange} placeholder="mm/dd/yy"/>
                </div>
                <div className="input half">
                    <div className="title">CHECK-OUT</div>
                    <input type="date" name="checkOut" min={checkoutMinDate} onKeyDown={(e) => {e.preventDefault()}} value={newBooking.checkOut} onChange={onChange} placeholder="mm/dd/yy"/>
                </div>
                <div className="input" id="quickcard-guest">
                    <div className="title">GUESTS</div>
                    <GuestDropdown guests={guests} setGuests={setGuests}/>
                </div>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}

export default connect(null, { book })(QuickCard);
