import React from "react";
import Sharing from "../reusable/sharing";
import "../../css/experience-place/experiencePlace.css";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ExperiencePlace(){
    return(
        <div id="expPlace">
            <Sharing />
            <div id="expContainer">
                <div className="section" id="first-sec">
                    <div className="left"></div>
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