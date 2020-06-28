import { takeEvery, all, fork, call, put } from "redux-saga/effects";
import actions from "./actions";
import Api from "./Api";
import {TRAVELER_TYPE} from "./constants";


function* signUpRequest(action) {
    try {
        const { body } = action;
        const {response, error} = yield call(Api.signUpRequest, body);

        if (response) {
            const {user_type} = response.data.user;

            if (user_type === Number(TRAVELER_TYPE)) {
                yield put(actions.signUpTravelerReceiveSuccess(response));
                yield put(actions.showHideWelcome(true));
            } else {
                yield put(actions.signUpDriverReceiveSuccess(response));
            }

            yield put(actions.setUserType(response.data.user.user_type));
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
            yield put(actions.signInReceiveSuccess(response));
            yield put(actions.setUserType(response.data.user.user_type));
            yield put(actions.showHideSignIn(false));
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

        console.log(" response ", response);

        if (response) {
            yield put(actions.carModelReceive(response.data));
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
    yield takeEvery(actions.CAR_MARK_REQUEST, carMarkRequest);
    yield takeEvery(actions.CAR_MODEL_REQUEST, carModelRequest);
}

export default function* root() {
    yield all([
        fork(watcherSaga)
    ]);
}