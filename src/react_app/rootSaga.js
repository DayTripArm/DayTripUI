import { takeEvery, all, fork, call, put, select } from "redux-saga/effects";
import actions from "./actions";
import Api from "./Api";
import _ from "lodash";
import {DRIVER_TYPE, TRAVELER_TYPE} from "./constants";
import dateFormat from "date-format";

const driverDataState = state => state.driverData;

function* signUpRequest(action) {
    try {
        const { body } = action;
        const {response, error} = yield call(Api.signUpRequest, body);

        if (response) {
            const {id, user_type} = response.data.user;

            if (user_type === Number(TRAVELER_TYPE)) {
                yield put(actions.signUpTravelerReceiveSuccess(response));
                yield put(actions.showHideWelcome(true));
            } else {
                yield put(actions.signUpDriverReceiveSuccess(response));
            }

            localStorage.setItem("id", id);
            yield put(actions.setUserType(user_type));
        } else {
            yield put(actions.signUpReceiveError(error.response));
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* signInRequest(action) {
    try {
        const { body } = action;
        const {response, error} = yield call(Api.signInRequest, body);

        if (response) {
            const {id, user_type, is_prereg} = response.data.user;

            yield put(actions.setUserType(user_type));
            localStorage.setItem("id", id);

            // redirect to /driver page for complete registration
            if (is_prereg && user_type === Number(DRIVER_TYPE)) {
                setTimeout(() => {
                    window.location.href = "/driver";
                }, 300);
            } else {
                yield put(actions.signInReceiveSuccess(response));
                yield put(actions.showHideSignIn(false));
            }
        } else {
            yield put(actions.signInReceiveError(error.response));
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* profileInfoRequest(action) {
    try {
        const { id } = action;
        const {response, error} = yield call(Api.getProfileInfo, id);
        const {user_type} = response.data.profile;

        if (user_type === Number(TRAVELER_TYPE)) {
            yield put(actions.travelerProfileInfoReceive(response.data.profile));
        } else if (user_type === Number(DRIVER_TYPE)) {
            yield put(actions.driverProfileInfoReceive(response.data.profile));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* updateProfileInfo(action) {
    try {
        const { id, data } = action;
        const {response, error} = yield call(Api.updateProfileInfo, id, data);

        if (response) {
            yield put(actions.profileInfoRequest(id));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* carMarkRequest(action) {
    try {
        const {response, error} = yield call(Api.getCarMarks);

        if (response) {
            yield put(actions.carMarkReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* carModelRequest(action) {
    const {mark_id} = action;

    try {
        const {response, error} = yield call(Api.getCarModels, mark_id);

        if (response) {
            yield put(actions.carModelReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* tipsRequest(action) {
    const {tip_type} = action;

    try {
        const {response, error} = yield call(Api.getTips, tip_type);

        if (response) {
            yield put(actions.tipsReceive(response.data, tip_type));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* destinationRequest(action) {
    try {
        const {response, error} = yield call(Api.getDestinations);

        if (response) {
            yield put(actions.destinationReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* saveDriverPreregData(action) {
    const driverState = yield select(driverDataState);
    const {preregistered_info, profile={}} = driverState;
    const {id: login_id} = profile;

    const formData = new FormData();

    const preregInfo = _.cloneDeep(_.omit(preregistered_info, ["car_mark_list", "car_model_list", "destination_list", "tips"]));
    const {birthYear="", birthMonth="", birthDay=""} = preregInfo;

    const photos = _.pick(preregInfo, ["car_photos", "gov_photos", "license_photos", "profile_photos"]); // get only photos
    const attributes = _.omit(preregInfo, ["car_photos", "gov_photos", "license_photos", "profile_photos"]); // get only attributes without photos

    attributes['car_specs'] = JSON.stringify(attributes['car_specs']);

    //construct date_of_birth
    attributes['date_of_birth'] = dateFormat("MM/dd/yyyy", new Date(birthYear, birthMonth, birthDay));
    delete attributes['birthYear'];
    delete attributes['birthMonth'];
    delete attributes['birthDay'];
    const profileInfo = _.pick(attributes, ["gender", "date_of_birth", "languages", "work", "about", "location"]);
    const driverInfo = _.omit(attributes, ["gender", "date_of_birth", "languages", "work", "about", "location"]);

    attributes['prereg_finish'] = true;
    attributes['login_id'] = login_id;

    // construct photos
    _.each(photos, (photos, name) => {
        photos.map(photo => formData.append(`${name}[${photo.name}]`, photo));
    });

    // construct attributes
    formData.append("driver_info", JSON.stringify(driverInfo));
    formData.append("profile_info", JSON.stringify(profileInfo));
    _.each(attributes, (value, name) => {
        formData.append(name, value);
    });


    try {
        const {response} = yield call(Api.saveDriverPreregData, formData);

        if (response) {
            setTimeout(() => {
                window.location.href = "/";
                delete localStorage.id;
                delete localStorage.userType;
            }, 300);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* watcherSaga() {
    yield takeEvery(actions.SIGN_UP_REQUEST, signUpRequest);
    yield takeEvery(actions.SIGN_IN_REQUEST, signInRequest);
    yield takeEvery(actions.PROFILE_INFO_REQUEST, profileInfoRequest);
    yield takeEvery(actions.UPDATE_PROFILE_INFO, updateProfileInfo);
    yield takeEvery(actions.CAR_MARK_REQUEST, carMarkRequest);
    yield takeEvery(actions.CAR_MODEL_REQUEST, carModelRequest);
    yield takeEvery(actions.TIPS_REQUEST, tipsRequest);
    yield takeEvery(actions.DESTINATION_REQUEST, destinationRequest);
    yield takeEvery(actions.SAVE_DRIVER_PREREG_DATA, saveDriverPreregData);
}

export default function* root() {
    yield all([
        fork(watcherSaga)
    ]);
}