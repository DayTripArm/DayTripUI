import React from "react";
import {Link} from "react-router-dom";
import FormInputBox from "../Form/FormInputBox";

function LoginSecurity(props) {

    return(
        <React.Fragment>
            <div className="account-segment-title"><Link to="/account" onClick={() => window.location.reload()} refresh="true">Account</Link> &nbsp; > &nbsp; Login & Security</div>
            <div className="personal-segment">
                <title className="marginBottom30">Login & Security</title>
                <h3 className="login-title">Login</h3>
                <FormInputBox
                    customClass="no-border"
                    type="input"
                    name="password"
                    label="Password"
                    value=""
                    empty_message="Last Update 13 days ago"
                    placeholder="Password"
                />
            </div>
        </React.Fragment>
    );
}

export default LoginSecurity;