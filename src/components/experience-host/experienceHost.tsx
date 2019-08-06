import React from "react"
import { Route } from "react-router";
import EHFirstStarted from "./EHFirstStarted";
import EHGetStarted from "./EHGetStarted";

export default function ExperienceHost(){
    return (
        <div id="ExpHostMain">
            <Route path="/experience-host/" component={EHFirstStarted}/>
            <Route path="/experience-host/get-started" component={EHGetStarted}/>
        </div>
    )
}