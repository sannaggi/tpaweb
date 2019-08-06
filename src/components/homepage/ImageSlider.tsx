import React, { useEffect } from 'react'
import image1 from '../../images/slider-images/image1.jpg'
import image2 from '../../images/slider-images/image2.jpg'
import image3 from '../../images/slider-images/image3.jpg'

function ImageSlider() {

    var slideIndex = 0;

    useEffect(() => {
        showSlides();
    })

    function showSlides() {
        var slides = document.getElementsByClassName('slides');
        if(slides.length === 0) return;
        for (let i = 0; i < slides.length; i++) {
            slides[i].setAttribute("style", "opacity: 0");
        }
        slideIndex++;
        if(slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex-1].setAttribute("style", "opacity: 1");
        setTimeout(showSlides, 7000);
    }

    return (
        <div className="slidesContainer">            
            <img src={image1} alt="" className="slides"/>
            <img src={image2} alt="" className="slides"/>
            <img src={image3} alt="" className="slides"/>
        </div>
    )
}

export default ImageSlider
