import React from 'react'
import '../../../css/footer.css'
import aivlogo from '../../../images/aivbnblogo.png'

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-link-container">
                    <div>
                        <span className="title"><strong>Aivbnb</strong></span>
                        <ul>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/" target="_blank">Main Page</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/press/news" target="_blank">News</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/help/topic/250/terms-policies" target="_blank">Policies</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/help?from=footer" target="_blank">Help</a></li>
                            <li><a rel="noopener noreferrer" href="https://github.com/sannaggi/tpaweb" target="_blank">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <span className="title"><strong>Discover</strong></span>
                        <ul>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/trust" target="_blank">Trust & Safety</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/invite?r=6" target="_blank">Travel Credit</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/gift?s=footer" target="_blank">Gift Cards</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnbcitizen.com/?utm_source=airbnb&utm_medium=footer&utm_campaign=product" target="_blank">Aivbnb citizen</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnbforwork.com/?utm_source=airbnb&utm_medium=footer&utm_campaign=product" target="_blank">Business Travel</a></li>
                        </ul>
                    </div>
                    <div>
                        <span className="title"><strong>Hosting</strong></span>
                        <ul>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/host/homes?from_footer=1" target="_blank">Why Host</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/hospitality" target="_blank">Hospitality</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/help/responsible-hosting" target="_blank">Responsible Hosting</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/help/community?s=footer" target="_blank">Community Center</a></li>
                            <li><a rel="noopener noreferrer" href="https://www.airbnb.com/host/experiences?from_footer=1" target="_blank">Host an Experience</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <img src={aivlogo} alt=""/>
                © 2019 Aivbnb, Inc. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
