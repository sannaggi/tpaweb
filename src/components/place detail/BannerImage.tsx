import React from 'react';
import "../../css/place detail/bannerImage.css";

export default function BannerImage(props: any){

    return(
        <img src={process.env.PUBLIC_URL + props.url} alt={props.alt}/>
    )
}