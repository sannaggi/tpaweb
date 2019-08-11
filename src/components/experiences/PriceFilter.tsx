import React from 'react'
import { connect } from 'react-redux';

function PriceFilter({setPriceClick, priceClick, getPriceVisible, currency, lowerprice, upperprice, setLowerPrice, setUpperPrice} : {priceClick: any, setPriceClick: any, getPriceVisible: any, setLowerPrice: any, setUpperPrice: any, currency: any, lowerprice:number, upperprice:number}) {
    
    function convertCurrency(price:any, limitPosition:number){
        if(limitPosition) return Math.ceil(price * currency.rate)
        return Math.floor(price * currency.rate)
    }

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    function changeLowerPrice(e) {
        if(e.target.value >= convertCurrency(upperprice, 1))
            setLowerPrice(upperprice)
        else if(e.target.value >= convertCurrency(1, 0))
            setLowerPrice(e.target.value / currency.rate)
        else setLowerPrice(1)
    }

    function changeUpperPrice(e) {
        if(e.target.value <= convertCurrency(lowerprice, 0))
            setUpperPrice(lowerprice)
        else if(e.target.value <= convertCurrency(999, 1))
            setUpperPrice(e.target.value / currency.rate)
        else setUpperPrice(999)
    }

    return (
        <div className="filter" style={getPriceVisible()}>
            <div className="priceFilterSummary">The average price of an experience is {getCurrency(27)}.</div>
            <div className="rangeContainer">
                <div className="range">
                    <div className="priceRange">
                        <div className="currencySymbol">{currency.icon}</div>
                        <input type="number" name="" min={convertCurrency(lowerprice, 0)} value={convertCurrency(lowerprice, 0)} onChange={changeLowerPrice}/>
                    </div>
                    <span> - </span>
                    <div className="priceRange">
                        <div className="currencySymbol">{currency.icon}</div>
                        <input type="number" name="" max={convertCurrency(upperprice, 1)} value={convertCurrency(upperprice, 1)} onChange={changeUpperPrice}/>
                    </div>
                </div>
                <span className="apply" onClick={() => setPriceClick(!priceClick)}>Apply</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, {})(PriceFilter)
