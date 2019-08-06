import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Slider({images, id} : {images:Array<Object>, id:any}) {

    const [index, setIndex] = useState(0)

    function onClick(value) {
        value = index + value;
        if(value < 0) value = images.length - 1;
        else if(value > images.length - 1) value = 0;

        setIndex(value);
    }

    return (
        <React.Fragment>
            <div className="arrow left" onClick={() => onClick(-1)}>&lt;</div>
                <div className="imageSlider">
                    <Link to={"/places/" + id} target="_blank">
                        <div className="currImage" style={{backgroundImage: "url('" + images[index] + "')"}}></div>
                    </Link>
                    <div className="dummyImage"></div>
                </div>
            <div className="arrow right" onClick={() => onClick(1)}>&gt;</div>
        </React.Fragment>
    )
}

export default Slider