import React from "react"
import StarReview from "./StarReview";
import "../../css/reusable/guestComment.css";

export default function GuestComment(props: any){
    var fetchComment = props.comments
    var out = []

    fetchComment.forEach(element => {
    
        const calcGreenStar = {
            width: "calc(20px * " + (element.rating / 2) + ")",
            overflow: "hidden",
        }

        let temp =
        <li key={element.userid}>
            <div className="guestProfile">
                <div className="profilePicture"><img src="" alt="uhuy"/></div>
                <div>
                    <div>PewDiePie • July, 2019</div>
                    {props.viewStar ? <div className="reviews">{element.rating + " "}<StarReview greenStar={calcGreenStar} /></div> : "" }
                </div>
            </div>
            <div>
                {element.review}
            </div>
        </li>
        out.push(temp)
    });
    return (
        <div id="guestComment">
            <ul>
                {out.map((obj: any) => obj)}
            </ul>
        </div>
    )
}