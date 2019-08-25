import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setChatDetail } from "../../actions/chatActions";

function ExperienceHost({id, user, setChatDetail} : {id: any, user: any, setChatDetail: any}) {

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

    function onClick(e) {
        if(e.target.className !== 'contact') return
        axios({
            url: "https://aivbnbapi.herokuapp.com/api/chat",
            method: "POST",
            data: {
                users: [id, user.id],
                host: id,
                status: "Inquiry"
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        setChatDetail(host)
    }

    useEffect(() => {
        if(host === undefined) return
        setContent(
            <React.Fragment>
                <img src={host.profileimage} className="profile-image" alt=""/>
                <h5>{host.firstname + " " + host.lastname}</h5>
                <Link to="/chat/detail" className="contact" onClick={onClick}>Contact host</Link>
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

export default connect(mapStateToProps, { setChatDetail })(ExperienceHost)
