import React, { useState } from 'react'
import '../../../css/currencySelect.css'
import { connect } from 'react-redux';
import { setCurrency } from "../../../actions/currencyActions";

function CurrencySelect({currency, setCurrency} : {currency:any, setCurrency:any}) {

    const [visible, setVisible] = useState(false)

    function getStyle() {
        if(visible) return {height: "376px"}
        return {height: "0px"}
    }

    function onClick(e) {
        setCurrency(e.target.innerHTML)
    }
    
    return (
        <div className="currContainer">
            <li id="curr" onClick={() => {setVisible(!visible)}}>{currency.symbol}</li>
            <ul id="currList" style={getStyle()}>
                <li onClick={onClick}>USD</li>
                <li onClick={onClick}>JPY</li>
                <li onClick={onClick}>IDR</li>
                <li onClick={onClick}>SGD</li>
                <li onClick={onClick}>KRW</li>
                <li onClick={onClick}>THB</li>
                <li onClick={onClick}>CAD</li>
                <li onClick={onClick}>CNY</li>
                <li onClick={onClick}>PHP</li>
                <li onClick={onClick}>GBP</li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, { setCurrency })(CurrencySelect)
