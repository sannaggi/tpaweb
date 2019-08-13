import React, { useEffect } from 'react'
import { decode } from "jsonwebtoken";
import { connect } from 'react-redux';
import { cookieLogin } from "../../actions/userActions";

function Global({cookieLogin} : {cookieLogin: any}) {

    useEffect(() => {
        if(localStorage.getItem("aiv-token") === null) return
        const token: any = decode(localStorage.getItem("aiv-token"))
        cookieLogin(token.data.id)
    }, [cookieLogin])

    return (
        <React.Fragment></React.Fragment>
    )
}

export default connect(null, { cookieLogin })(Global)
