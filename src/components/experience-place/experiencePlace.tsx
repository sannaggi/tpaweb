import React, {useState} from "react";
import Sharing from "../reusable/sharing";
import "../../css/experience-place/experiencePlace.css";
import GoogleMapReact from "google-map-react";
import Stories from 'react-insta-stories'
import StarReview from "../reusable/StarReview";
import ReactPaginate from "react-paginate";
import GuestComment from "../reusable/GuestComment";


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ExperiencePlace(){
    var perPage = 5
    var fetchComment = [
        {comment: "This place is fucking awesome"},
        {comment: "This place is fucking awesome"},
        {comment: "This place is fucking awesome"},
        {comment: "This place is fucking awesome"},
        {comment: "This place is fucking awesome"},
        {comment: "This place is fucking great"},
        {comment: "This place is fucking great"},
        {comment: "This place is fucking great"},
        {comment: "This place is fucking great"},
        {comment: "This place is fucking great"},
        {comment: "This place is fucking cool"},
        {comment: "This place is fucking cool"},
        {comment: "This place is fucking cool"},
        {comment: "This place is fucking cool"},
        {comment: "This place is fucking cool"},
    ]
    const [sentComments, setsentComments] = useState(fetchComment.slice(1 * perPage, 1 * perPage + perPage))
    
    const stories = [{ url: 'https://picsum.photos/1080/1920' }, { url: 'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN' }, { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg' }, { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 }, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', type: 'video'}, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video' }, 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80']
    var averageRating = 3.65
    var greenStar = {
        width: "calc(20px * " + averageRating + ")",
        overflow: "hidden",
    }

    function handlePageChange(data){
        setsentComments(fetchComment.slice(data.selected * perPage, data.selected * perPage + perPage))
    }

    return(
        <div id="expPlace">
            <Sharing />
            <div id="expContainer">
                <div className="section" id="first-sec">
                    <div className="left">
                        <div>
                            <Stories 
                                stories={stories}
                                defaultInterval={8000}
                                loop={true}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div id="expCategory">
                            [Experience Category]
                        </div>
                        <div id="expName">
                            [Experience Name]
                        </div>
                        <div id="expBasicInfo">
                            <div>[location]</div>
                            <div>[total hours]</div>
                            <div>[bring list]</div>
                            <div>[used language]</div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">About your host</div>
                                <div className="info-sec-desc">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe doloribus inventore, officiis cumque esse ipsam. Tenetur, magnam odit! Nesciunt tempore consequatur consequuntur sint! Explicabo obcaecati ea id doloremque? Ex?
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">What we'll do</div>
                                <div className="info-sec-desc">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores excepturi dolorem expedita dolores, veniam voluptatibus culpa temporibus nam magni ipsum sint quaerat voluptatem provident, pariatur alias in, recusandae quo molestiae. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe doloribus inventore, officiis cumque esse ipsam. Tenetur, magnam odit! Nesciunt tempore consequatur consequuntur sint! Explicabo obcaecati ea id doloremque? Ex?
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">What else you should know</div>
                                <div className="info-sec-desc">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores excepturi dolorem expedita dolores, veniam voluptatibus culpa temporibus nam magni ipsum sint quaerat voluptatem provident, pariatur alias in, recusandae quo molestiae. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe doloribus inventore, officiis cumque esse ipsam. Tenetur, magnam odit! Nesciunt tempore consequatur consequuntur sint! Explicabo obcaecati ea id doloremque? Ex?
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">What to bring</div>
                                <div className="info-sec-desc">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quae in, laudantium eos qui enim quos necessitatibus, aut asperiores assumenda quo vero nemo, iste odit atque excepturi ad laborum sed.
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="section" id="second-sec">
                    <div className="left">
                        <div className="section-head">Guest photos</div>
                    </div>
                    <div className="right">
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                    </div>
                </div>
                <div className="section" id="section-reviews">
                    <div className="left">
                        <div className="section-head">Guest reviews</div>
                        <div id="rating">{averageRating}<StarReview greenStar={greenStar}/></div>
                    </div>
                    <div className="right">
                        <GuestComment comments={sentComments} viewStar={true}/>
                        <ReactPaginate
                            onPageChange={handlePageChange}
                            pageCount={fetchComment.length / perPage}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
                <div className="section">
                    <div className="left">
                        <div className="section-head">Where you'll be</div>
                    </div>
                    <div className="right">
                        World's 2nd oldest National Park - Royal National Park, NSW Figure 8 Pools Burning Palms Beach Wattamolla Lagoon and Beach Bald Hill Lookout Sea Cliff Bridge on the Grand Pacific Drive
                    </div>
                </div>
                <div className="section" style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        defaultCenter={{lat: 59.95  , lng: 30.33}}
                        defaultZoom={11}
                    >
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    )
}