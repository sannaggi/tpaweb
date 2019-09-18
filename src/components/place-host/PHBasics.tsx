import React from 'react'
import '../../css/place-host/PHBasics.css'

export default function PHBasics(){
    return(
        <div id="PHBasicSection">
            <h2>Basics</h2>
            <div className="basicSubSec">
                <div>
                    <div className="input">
                        <select name="" id="" placeholder=" ">
                            <option value="-">--Place Type--</option>
                            <option value="House">House</option>
                            <option value="Apartemen">Apartement</option>
                            <option value="Beach House">Beach House</option>
                            <option value="Villa">Villa</option>
                            <option value="Summer House">Summer House</option>
                        </select>
                        <div className="label">Place Type</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="" placeholder="City, Country"/>
                        <div className="label">Place Location</div>
                    </div>
                    <div className="input">
                        <select name="" id="" placeholder=" ">
                            <option value="-">--Property Type--</option>
                            <option value="A">Class A</option>
                            <option value="B">Class B</option>
                            <option value="C">Class C</option>
                        </select>
                        <div className="label">Property Type</div>
                    </div>
                    <div>
                        <h4>What Will Guest Have</h4>
                        <div id="guestHave">
                            <div>
                                <input type="radio" name="guestHave" id="entire"/>
                                <label htmlFor="entire">Entire Place</label>
                            </div>
                            <div>
                                <input type="radio" name="guestHave" id="private"/>
                                <label htmlFor="private">Private Room</label>
                            </div>
                            <div>
                                <input type="radio" name="guestHave" id="shared"/>
                                <label htmlFor="shared">Shared Room</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}