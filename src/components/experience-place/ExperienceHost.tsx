import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

function ExperienceHost({id, user} : {id: any, user: any}) {

    const [host, setHost] = useState()
    const [content, setContent] = useState()

    useEffect(() => {
        if(id === undefined) return
        axios.get("https://aivbnbapi.herokuapp.com/api/users/" + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {setHost(data.data)})
    }, [id])

    useEffect(() => {
        if(host === undefined) return
        setContent(
            <React.Fragment>
                <img src={host.profileimage} className="profile-image" alt=""/>
                <h5>{host.firstname + " " + host.lastname}</h5>
                <Link to="./" className="contact">Contact host</Link>
            </React.Fragment>
        )
    }, [host])
    
    return (
        <div className="host-profile">
            {content}
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user.item,
})

export default connect(mapStateToProps, {})(ExperienceHost)
