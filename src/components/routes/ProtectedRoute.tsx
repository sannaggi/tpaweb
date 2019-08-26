import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function ProtectedRoute({component: Component, user, ...rest}) {
    return (
        <Route {...rest} render={(props) => (
            user.id !== undefined? <Component {...props}/> : <Redirect to="/"/>
        )}/>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {})(ProtectedRoute)
