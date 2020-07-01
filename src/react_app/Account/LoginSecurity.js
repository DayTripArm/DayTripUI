import React from "react";
import FormInputBox from "../Form/FormInputBox";

function LoginSecurity(props) {

    return(
        <React.Fragment>
            <div className="account-segment-title">
                <span className="account-name" onClick={() => props.setType("")}>Account</span>
                <span className="arrow"></span>
                <span className="text">Login & Security</span>
            </div>
            <div className="personal-segment">
                <title className="marginBottom30">Login & Security</title>
                <h3 className="login-title">Login</h3>
                <FormInputBox
                    customClass="no-border"
                    editButtonText="Update"
                    type="input"
                    profile="login"
                    name="password"
                    showEye={true}
                    password="password"
                    label="Password"
                    value=""
                    empty_message="Last Update N/A days ago"
                    placeholder="Password"
                />
            </div>
        </React.Fragment>
    );
}

export default LoginSecurity;