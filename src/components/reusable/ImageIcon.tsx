import React from 'react'

export default function ImageIcon({src, size} : {src: any, size: any}){
    return (
        <img id="imgIcon" src={src} style={{width: size + "px", height: size + "px", verticalAlign: "middle"}} alt=""/>
    )
}