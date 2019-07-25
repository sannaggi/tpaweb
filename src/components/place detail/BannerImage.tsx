import React from 'react';
import ReactImageAppear from "react-image-appear";

export default function BannerImage(props: any){

    return(
        <ReactImageAppear src={process.env.PUBLIC_URL + props.url}/>
    )
}