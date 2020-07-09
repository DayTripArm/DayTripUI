import { takeEvery, all, fork, call, put } from "redux-saga/effects";
import actions from "./actions";
import Api from "./Api";
import {TRAVELER_TYPE} from "./constants";


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
            const {id, user_type} = response.data.user;

            yield put(actions.signInReceiveSuccess(response));
            yield put(actions.setUserType(user_type));
            yield put(actions.showHideSignIn(false));

            localStorage.setItem("id", id);
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

        if (response) {
            yield put(actions.profileInfoReceive(response.data.profile));
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

function* watcherSaga() {
    yield takeEvery(actions.SIGN_UP_REQUEST, signUpRequest);
    yield takeEvery(actions.SIGN_IN_REQUEST, signInRequest);
    yield takeEvery(actions.PROFILE_INFO_REQUEST, profileInfoRequest);
    yield takeEvery(actions.UPDATE_PROFILE_INFO, updateProfileInfo);
    yield takeEvery(actions.CAR_MARK_REQUEST, carMarkRequest);
    yield takeEvery(actions.CAR_MODEL_REQUEST, carModelRequest);
    yield takeEvery(actions.TIPS_REQUEST, tipsRequest);
    yield takeEvery(actions.DESTINATION_REQUEST, destinationRequest);
}

export default function* root() {
    yield all([
        fork(watcherSaga)
    ]);
}