import React from 'react'
import "../../css/registerForm.css";

function RegisterForm({match} : {match:any}) {

    function onSubmit() {
        window.close()
    }

    return (
        <div className="registerFormContainer">
            <form>
                <div><h3 className="center">Complete your information</h3></div>
                <div><p className="center">You will be registered with informations below, click submit to finalize registration</p></div>
                <div>
                    <div className="inputField">
                        <input type="text" disabled value={match.params.firstname}/>
                        <span><i className="fa fa-user-o"></i></span>
                    </div>
                </div>
                <div>
                    <div className="inputField">
                        <input type="text" disabled value={match.params.lastname}/>
                        <span><i className="fa fa-user-o"></i></span>
                    </div>
                </div>
                <div>
                    <div className="inputField">
                        <input type="email" disabled value={match.params.email}/>
                        <span>&#9993;</span>
                    </div>
                </div>
                <div><div className="center info">This info came from {match.params.auth}</div></div>
                <div><p>We'll send you marketing promotions, special offers, inspiration, and policy updates via email.</p></div>
                <div><input type="submit" value="Finish Signing Up" onClick={onSubmit}/></div>
            </form>
        </div>
    )
}

export default RegisterForm
