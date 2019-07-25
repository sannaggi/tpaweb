import React from 'react';

export default function BannerImage(props: any){

    return(
        <img id={props.id} src={process.env.PUBLIC_URL + props.url} alt={props.alt}/>
    )
}