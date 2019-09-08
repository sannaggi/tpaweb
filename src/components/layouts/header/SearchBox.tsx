import React, { useState, useEffect } from 'react'
import searchIcon from '../../../images/search-icon.png';
import axios from 'axios'
import SearchResult from "../../homepage/SearchResult";
import { Redirect } from "react-router-dom";

function SearchBox() {
    
    const [searchResult, setSearchResult] = useState([])
    const [searchText, setSearchText] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [redirectData, setRedirectData] = useState({
        type: "",
        id: ""
    })

    function getLogo(type:string) {
        if(type === "place") return <span><i className="fa fa-home"></i></span>
        return  <span>&#10070;</span>
    }

    function onClick(data) {
        setRedirectData({
            type: data.type + "s",
            id: data.id
        })
        setSearchText(data.name)
        setSearchResult([])

        setRedirect(true)
    }

    function search(e:any) {
        setSearchText(e.target.value);
        if(e.target.value === "") {
            setSearchResult([])
            return
        }
        axios.get("http://localhost/api/search/" + e.target.value, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((data) => {return new Promise((resolve) => {resolve(data.data)})})
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

    function onElementClick(e) {
        if(e.target.className !== "searchItem") {
            setSearchResult([])
        }
    }

    function renderRedirect() {
        if(redirect) {
            return <Redirect to={`/${redirectData.type}/${redirectData.id}`}/>
        }
    }

    useEffect(() => {
        document.addEventListener("click", onElementClick)
    }, [])

    return (
        <div className="header-search-container">
            {renderRedirect()}
            <div className="searchBox">
                <img src={searchIcon} alt=""/>
                <input type="search" name="" value={searchText} id="headerSearch" placeholder="Search" onChange={search}/>
            </div>
            <ul className="search-container header-search">
                {searchResult}
            </ul>
        </div>
    )
}

export default SearchBox
