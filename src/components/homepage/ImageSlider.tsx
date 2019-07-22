import React from 'react'
import image1 from '../../images/slider-images/image1.jpg'
import image2 from '../../images/slider-images/image2.jpg'
import image3 from '../../images/slider-images/image3.jpg'

function ImageSlider() {
    return (
        <div className="slidesContainer">            
            <img src={image1} alt="" className="slides"/>
            <img src={image2} alt="" className="slides"/>
            <img src={image3} alt="" className="slides"/>
        </div>
    )
}

export default ImageSlider
