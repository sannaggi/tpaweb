import React from "react"
import { Route } from "react-router";
import EHFirstStarted from "./EHFirstStarted";
import EHGetStarted from "./EHGetStarted";
import PlaceHost from "../place-host/PlaceHost";

export default function ExperienceHost(){
    return (
        <div id="ExpHostMain">
            <Route path="/become-host/" component={EHFirstStarted}/>
            <Route path="/become-host/experience-get-started" component={EHGetStarted}/>
            <Route path="/become-host/place-get-started" component={PlaceHost}/>
        </div>
    )
}