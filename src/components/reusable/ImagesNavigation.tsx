import React from 'react'
import BannerImage from '../place detail/BannerImage';
import '../../css/reusable/ImagesNavigation.css'

export default function ImagesNavigation({fullImageSrc, handleImageClick, images} : {fullImageSrc: any, handleImageClick: any, images: any}){

    function getSrc(){
        let temp = fullImageSrc.split('/')
        let i = parseInt(temp[temp.length - 1].split('.')[0])
        return i
    }

    function getPath(){
        let temp = fullImageSrc.split('/')
        let str = ""
        for(let i = 0; i < temp.length - 1; i++) str += temp[i] + "/"
        return str
    }

    function getFullPath(x){
        if(images === undefined) return ""
        let i = getSrc()
        i = ((i + x) == 0 ? images.length : (i + x) > images.length ? 1 : (i + x))
        let path = "" + getPath() + i + ".jpg"
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
                        <div id="l"><img src={getFullPath(-1)} alt={getFullPath(-1)} onClick={handleImageClick}></img>&lt;</div>
                        <div id="mid">
                            <BannerImage handleImageClick={handleImageClick} id="fullScreen" url={fullImageSrc} alt="images"/>
                        </div>
                        <div id="r"><img src={getFullPath(1)} alt={getFullPath(1)} onClick={handleImageClick}></img>&gt;</div>
                    </div>
                </div>
            </div>
        </div>
    )
}