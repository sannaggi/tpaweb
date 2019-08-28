import React from 'react'
import BannerImage from '../place detail/BannerImage';
import '../../css/reusable/ImagesNavigation.css'

export default function ImagesNavigation({fullImageSrc, handleImageClick, images} : {fullImageSrc: any, handleImageClick: any, images: any}){

    function getI(){
        for(let i = 0; i < images.length; i++){
            if((fullImageSrc + "").includes(images[i])) return i
        }
    }

    function getFullPath(x){
        if(images === undefined) return ""
        let i = getI()
        i = (i + x) % images.length
        i = i < 0 ? images.length - 1 : i
        let path = images[i]
        return path;
    }

    return (
        <div className="modal" id="imagesNavigation">
            <div className="modal-content" id="imgNavContent">
                <div>
                    <div className="close-modal" onClick={
                            () => {
                                document.getElementById("imagesNavigation").setAttribute("style", "display: none !important")
                                document.getElementById("imgNavContent").setAttribute("style", "opacity: 0")
                            }
                        }>&#10005;</div>
                    <div id="imageHolder">
                        <div id="l"><img src={getFullPath(-1)} alt={"lul"} onClick={handleImageClick}></img>&lt;</div>
                        <div id="mid">
                            <BannerImage handleImageClick={handleImageClick} id="fullScreen" url={fullImageSrc} alt="images"/>
                        </div>
                        <div id="r"><img src={getFullPath(1)} alt={"lul"} onClick={handleImageClick}></img>&gt;</div>
                    </div>
                </div>
            </div>
        </div>
    )
}