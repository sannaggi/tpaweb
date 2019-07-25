import React from 'react'
import ImageSlider from './ImageSlider'
import QuickCard from './QuickCard'
import RecommmendedPlace from './RecommendedPlace'
import RecommendedExperience from "./RecommendedExperience";
import '../../css/homepage/homepage.css'

function Homepage() {
    return (
        <main>
            <div className="quickCardContainer">
                <QuickCard />
                <ImageSlider />
            </div>
            <RecommmendedPlace />
            <RecommendedExperience />
        </main>
    )
}

export default Homepage
