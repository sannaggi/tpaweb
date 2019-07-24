import React from 'react';

export default function BannerImage(props: any){
    var imgUrl: any = import(props.url);

    return(
        <div className="bannerImage">
            {props.url}
            <img src={imgUrl} alt=""/>
        </div>  
    )
}