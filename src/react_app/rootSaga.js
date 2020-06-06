import { takeEvery, all, fork, call, put } from "redux-saga/effects";
import actions from "./actions";
import Api from "./Api";


function* signUpRequest(action) {
    try {
        const { body } = action;
        const {response, error} = yield call(Api.signUpRequest, body);

        if (response) {
            yield put(actions.signUpReceiveSuccess(response));
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
            console.log(" response ", response);
            yield put(actions.profileInfoReceive(response.data.profile));
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
}

export default function* root() {
    yield all([
        fork(watcherSaga)
    ]);
}