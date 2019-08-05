import React, { useEffect } from "react"
import "../../css/experience-host/EHGetStarted.css";

export default function EHGetStarted(){

    useEffect(() => {
        document.getElementById("EHFirstStarted").setAttribute("style", "opacity: 0");
        document.getElementById("EHFirstStarted").setAttribute("style", "position: absolute");
        function delEH(){
            let obj = document.getElementById("EHGetStarted");
            if(obj !== null)
                obj.setAttribute("style", "opacity: 1; z-index: 9");
        }
        function EHdel(){
            let obj = document.getElementById("EHFirstStarted");
            if(obj !== null)
                obj.setAttribute("style", "display: none")
        }
        setTimeout(delEH, 750);
        setTimeout(EHdel, 800);
    })

    return(
        <div id="EHGetStarted">
            <div className="left">
                <div className="section">
                    <input type="checkbox" name="" id="check"/>
                    <label htmlFor="check">
                        <div className="coolCheck">
                        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: "24px", width: "24px", display: "block", fill: "rgb(0, 132, 137)"}}><path d="m12 3c4.675 0 8.5 3.825 8.5 8.5s-3.825 8.5-8.5 8.5-8.5-3.825-8.5-8.5 3.825-8.5 8.5-8.5zm-4.20954717 8.0542068c-.34328861-.3676077-.91958389-.3873221-1.28719154-.0440335s-.38732213.9195839-.04403352 1.2871915l3.00196483 3.2146282c.35564582.3808402.9577342.3861852 1.3200851.0117188l6.6278415-6.84944861c.3497607-.36145525.3402805-.9380097-.0211748-1.28777042-.3614552-.34976072-.9380097-.34028043-1.2877704.02117481l-5.961635 6.16096702z"></path></svg>
                        </div>
                    </label>
                </div>
            </div>
            <div className="right">
                
            </div>
        </div>
    )
}