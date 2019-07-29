import React from 'react'
import ImageSlider from './ImageSlider'
import QuickCard from './QuickCard'
import RecommmendedPlace from './RecommendedPlace'
import RecommendedExperience from "./RecommendedExperience";
import '../../css/homepage/homepage.css'
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <main>
            <div className="quickCardContainer">
                <QuickCard />
                <ImageSlider />
            </div>
            <div className="home-content">
                <h2>Explore Aivbnb</h2>
                <div className="container">
                    <Link to="/places">
                        <div className="showContainer">
                            <div className="showImage" style={{backgroundImage: "url('/images/placeHeader.jpg')"}}></div>
                            <div className="showInfo">
                                <div>
                                    <h3>Stays</h3>
                                    Homes, boutique hotels & more
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/experiences">
                        <div className="showContainer">
                            <div className="showImage" style={{backgroundImage: "url('/images/experienceHeader.jpg')"}}></div>
                            <div className="showInfo">
                                <div>
                                    <h3>Experiences</h3>
                                    Activities hosted by locals
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <RecommmendedPlace />
                <RecommendedExperience />
            </div>
        </main>
    )
}

export default Homepage
