import React from "react";
import FormInputBox from "../Form/FormInputBox";
import {useSelector} from "react-redux";
import {GENDER_LIST} from "../constants";

function PersonalInfo(props) {

    //const dispatch = useDispatch();
    const {travelerData} = useSelector(state => state);
    const {profile} = travelerData;

    const {
        name,
        gender,
        date_of_birth,
        email,
        phone,
        about,
        location,
        languages,
        work
    } = profile || {};

    const genderList = GENDER_LIST.map(item => {return {label: item, value: item}});

    return(
        <React.Fragment>
            <div className="account-segment-title">
                <span className="account-name" onClick={() => props.setType("")}>Account</span>
                <span className="arrow"></span>Personal Info</div>
            <div className="personal-segment">
                <title>Personal Info</title>
                <div className="user-image">
                    <div className="image-upload"></div>
                    <span className="text">Upload</span>
                </div>

                <FormInputBox
                    type="input"
                    name="name"
                    label="User Name"
                    value={name}
                    placeholder="John Doe"
                />
                <FormInputBox
                    type="select"
                    options={genderList}
                    name="gender"
                    label="Gender"
                    value={gender}
                    placeholder="Male"
                    empty_message="Not Specified"
                />
                <FormInputBox
                    type="date"
                    name="date_of_birth"
                    label="Date of Birth"
                    value={date_of_birth}
                    empty_message="Not Specified"
                />
                <FormInputBox
                    type="input"
                    name="email"
                    label="Email Address"
                    value={email}
                    disabled={true}
                />
                <FormInputBox
                    type="input"
                    name="phone"
                    label="Phone Number"
                    value={phone}
                    empty_message="Not Specified"
                />
                <FormInputBox
                    type="input"
                    name="about"
                    label="About"
                    value={about}
                    empty_message="Not Written"
                />
                <FormInputBox
                    type="input"
                    name="location"
                    label="Location"
                    placeholder="Yerevan, Armenia"
                    value={location}
                    empty_message="Not Written"
                />
                <FormInputBox
                    type="input"
                    name="languages"
                    label="Languages/Speaks"
                    placeholder="English, Russian, French"
                    value={languages}
                    empty_message="Not Written"
                />
                <FormInputBox
                    type="input"
                    name="work"
                    label="Work"
                    placeholder=""
                    value={work}
                    empty_message="Not Written"
                />
            </div>
        </React.Fragment>
    );
}

export default PersonalInfo;
