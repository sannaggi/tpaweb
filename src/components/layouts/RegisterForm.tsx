import React, { useState } from 'react'
import "../../css/registerForm.css";

function RegisterForm({match} : {match:any}) {

    const [formData, setFormData] = useState({
        firstName: match.params.firstName,
        lastName: match.params.lastName,
        email: match.params.email,
        dob: {
            month: "Month",
            day: "Day",
            year: "Year"
        }
    })

    function onChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <div className="registerFormContainer">
            <form action="" method="post">
                <div><h3 className="center">Complete your information</h3></div>
                <div><p className="center">Please review and provide any missing information to finish signing up.</p></div>
                <div>
                    <div className="inputField">
                        <input type="text" name="firstName" onChange={onChange} value={formData.firstName}/>
                        <span><i className="fa fa-user-o"></i></span>
                    </div>
                </div>
                <div>
                    <div className="inputField">
                        <input type="text" name="lastName" onChange={onChange} value={formData.lastName}/>
                        <span><i className="fa fa-user-o"></i></span>
                    </div>
                </div>
                <div>
                    <div className="inputField">
                        <input type="email" name="email" onChange={onChange} value={formData.email}/>
                        <span>&#9993;</span>
                    </div>
                </div>
                <div><div className="center info">This info came from {match.params.auth}</div></div>
                <div><p>We'll send you marketing promotions, special offers, inspiration, and policy updates via email.</p></div>
                <div><input type="submit" value="Finish Signing Up"/></div>
            </form>
        </div>
    )
}

export default RegisterForm
