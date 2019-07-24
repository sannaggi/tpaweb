import React from 'react';

export default function BannerImage(props: any){

    return(
        <img src={process.env.PUBLIC_URL + props.url} alt={props.alt}/>
    )
}