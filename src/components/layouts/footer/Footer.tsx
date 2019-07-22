import React from 'react'
import '../../../css/footer.css'
import aivlogo from '../../../images/aivbnblogo.png'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <span className="title"><strong>Aivbnb</strong></span>
                <ul>
                    <li><a href="https://www.airbnb.com/">Main Page</a></li>
                    <li><Link to="">News</Link></li>
                    <li><Link to="">Policies</Link></li>
                    <li><a href="https://github.com/sannaggi/tpaweb">About</a></li>
                </ul>
            </div>
            <div className="copyright">
                <img src={aivlogo} alt=""/>
                © 2019 Aivbnb, Inc. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
