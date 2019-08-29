import React, { useState, useEffect } from 'react'
import '../../css/experience-host/EHGSPhotos.css'
import ImageEdit from '../reusable/ImageEdit';

export default function EHGSPhotos({imageURL, idx, delImage} : {imageURL: any, idx: any, delImage: any}){

    var ref = React.createRef<HTMLDivElement>()
    const [imageSource, setImageSource] = useState(imageURL)

    useEffect(() => {
        setImageSource(imageURL)
    }, [imageURL])

    const onClick = (e) => {
        ref.current.children[1].setAttribute("style", "display: flex")
    }

    function getImageEdit(){
        if(imageURL === undefined) return <div></div>
        return <ImageEdit src={imageSource} setProfilePhoto={setImageSource}/>
    }

    return (
        <div className="insertImage" ref={ref}>
            <div className="delPhotos" id={idx} onClick={delImage}>&#10005;</div>
            {getImageEdit()}
            <img src={imageSource} alt=""/>
            <div className="editPop" ><div onClick={onClick}>...</div></div>
        </div>
    )
}