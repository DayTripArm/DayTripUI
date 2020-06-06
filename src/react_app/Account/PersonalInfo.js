import React from "react";
import {Link} from "react-router-dom";
import FormInputBox from "../Form/FormInputBox";
import FormDatePicker from "../Form/FormDatePicker";

function PersonalInfo(props) {

    return(
        <React.Fragment>
            <div className="account-segment-title"><Link to="/account" onClick={() => window.location.reload()} refresh="true">Account</Link> &nbsp; > &nbsp; Personal Info</div>
            <div className="personal-segment">
                <title>Personal Info</title>
                <div className="user-image">
                    <div className="image-upload"></div>
                    <span className="text">Upload</span>
                </div>

                <FormInputBox
                    type="input"
                    name="user"
                    label="User Name"
                    value="John Doe"
                    placeholder="John Doe"
                />
                <FormInputBox
                    type="select"
                    options={["Male", "Female"]}
                    name="gender"
                    label="Gender"
                    value="Male"
                    placeholder="Male"
                />
                <FormDatePicker
                    type="date"
                    name="date_of_birth"
                    label="Date of Birth"
                    value=""
                    options={["Male", "Female"]}
                    empty_message="Current date"
                />
                <FormInputBox
                    type="input"
                    name="email"
                    label="Email Address"
                    value="gevorg.petrosyan@gmail.com"
                    disabled={true}
                />
                <FormInputBox
                    type="input"
                    name="phone"
                    label="Phone Number"
                    value=""
                    empty_message="Not Specified"
                />
                <FormInputBox
                    type="input"
                    name="about"
                    label="About"
                    value=""
                    empty_message="Not Written"
                />
                <FormInputBox
                    type="input"
                    name="location"
                    label="Location"
                    placeholder="Yerevan, Armenia"
                    value="Yerevan, Armenia"
                    empty_message="Not Written"
                />
                <FormInputBox
                    type="input"
                    name="languages"
                    label="Languages/Speaks"
                    placeholder="English, Russian, French"
                    value="English, Russian, French"
                    empty_message="Not Written"
                />
                <FormInputBox
                    type="input"
                    name="work"
                    label="Work"
                    placeholder=""
                    value=""
                    empty_message="Not Written"
                />
            </div>
        </React.Fragment>
    );
}

export default PersonalInfo;