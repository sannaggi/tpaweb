import React from 'react';

export default function BannerImage({id, url, alt, handleImageClick} : {id: any, url: any, alt: any, handleImageClick: any}){

    return(
        <img id={id} src={process.env.PUBLIC_URL + url} onClick={handleImageClick} alt={alt}/>
    )
}