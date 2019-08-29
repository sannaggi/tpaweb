import React from 'react'

export default function EHGSSection({headName, id} : {headName: any, id: any}){

    return (
        <div className="section">
            <div className="head">{headName}</div>
            <div className="checkbox">
                <input type="checkbox" name="" id={id + 'Check'}/>
                <div className="coolCheck">
                    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: "fit-content", width: "fit-content", display: "block", fill: "#008489", transform: 'scale(1.5)'}}><path d="m12 3c4.675 0 8.5 3.825 8.5 8.5s-3.825 8.5-8.5 8.5-8.5-3.825-8.5-8.5 3.825-8.5 8.5-8.5zm-4.20954717 8.0542068c-.34328861-.3676077-.91958389-.3873221-1.28719154-.0440335s-.38732213.9195839-.04403352 1.2871915l3.00196483 3.2146282c.35564582.3808402.9577342.3861852 1.3200851.0117188l6.6278415-6.84944861c.3497607-.36145525.3402805-.9380097-.0211748-1.28777042-.3614552-.34976072-.9380097-.34028043-1.2877704.02117481l-5.961635 6.16096702z"></path></svg>
                </div>
            </div>
        </div>
    )
}