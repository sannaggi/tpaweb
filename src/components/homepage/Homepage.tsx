import React from 'react'
import ImageSlider from './ImageSlider'
import QuickCard from './QuickCard'
import '../../css/homepage/homepage.css'
import PhotoHolder from '../profile/PhotoHolder';
import ProfileCard from '../profile/profile card/ProfileCard';

function Homepage() {
    return (
        <main>
            <div className="quickCardContainer">
                <QuickCard />
                <ImageSlider />
            </div>
        </main>
    )
}

export default Homepage
