import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function ProtectedRoute({component: Component, user, ...rest}) {

    function getRedirected() {
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} render={(props) => (
            user.id !== undefined? <Component {...props}/> : getRedirected()
        )}/>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {})(ProtectedRoute)
