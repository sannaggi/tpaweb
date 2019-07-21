import React from 'react'
import searchIcon from '../../images/search-icon.png';

function SearchBox() {
    return (
        <div className="searchBox">
            <img src={searchIcon} alt=""/>
            <input type="text" name="" id="" placeholder="Search"/>
        </div>
    )
}

export default SearchBox
