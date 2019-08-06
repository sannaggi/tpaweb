import React, { useEffect } from "react"
import "../../css/reusable/instaStories.css";

function InstaStories(){
    var arr = [
        {src: "1.webm", type: "vid", delay: 30},
        {src: "2.webp", type: "pic", delay: 15},
        {src: "3.webp", type: "pic", delay: 15},
        {src: "4.webp", type: "pic", delay: 15},
        {src: "5.jpg", type: "pic", delay: 15},
        {src: "6.webp", type: "pic", delay: 15}
    ]

    let i = 0
    let index = 0
    useEffect(() => {
        setInterval(() => {
            console.log(i)
            i++
        }, 1000)
        if(i < arr[index].delay) return
        index++
        
    })

    return(
        <div id="instaStories">
            <div>
                <div id="instaSlide">
                </div>
            </div>
        </div>
    )
}

export default InstaStories