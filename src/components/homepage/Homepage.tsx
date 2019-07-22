import React from 'react'
import ImageSlider from './ImageSlider'
import QuickCard from './QuickCard'
import '../../css/homepage/homepage.css'

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
