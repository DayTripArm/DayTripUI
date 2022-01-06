import { takeEvery, all, fork, call, put, select } from "redux-saga/effects";
import actions from "./actions";
import Api from "./Api";
import _ from "lodash";
import {DRIVER_TYPE, TRAVELER_TYPE} from "./constants";
import dateFormat from "date-format";

const driverDataState = state => state.driverData;
const travelerDataState = state => state.travelerData;

function* signUpRequest(action) {
    try {
        const { body } = action;
        const {response, error} = yield call(Api.signUpRequest, body);

        if (response) {
            const {confirmed_at, email} = response.data;

            if (!confirmed_at) {
                // hide sign up form and show confirmation pop up
                yield put(actions.setEmail(email));
                yield put(actions.showHideSignUp(false));
                yield put(actions.showHideConfirmation(true));
            }

            // if (user_type === Number(TRAVELER_TYPE)) {
            //     yield put(actions.signUpTravelerReceiveSuccess(response));
            //     yield put(actions.showHideWelcome(true));
            // } else {
            //     yield put(actions.setPrereg(is_prereg));
            //     yield put(actions.signUpDriverReceiveSuccess(response));
            // }
            //
            // localStorage.setItem("id", id);
            // yield put(actions.setUserType(user_type));
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
            const {confirmed_at, id, email} = response.data.user;

            if (!confirmed_at && !id) { // not confirm part
                // hide sign in form and show confirmation pop up
                yield put(actions.setEmail(email));
                yield put(actions.showHideSignIn(false));
                yield put(actions.showHideConfirmation(true));
            } else { // normal login flow
                const {id, user_type, is_prereg} = response.data.user;

                localStorage.setItem("id", id);

                // redirect to /driver page for complete registration
                if (is_prereg && user_type === Number(DRIVER_TYPE)) {
                    setTimeout(() => {
                        window.location.href = "/driverRegister";
                    }, 100);
                } else {
                    yield put(actions.setUserType(user_type));
                    yield put(actions.setPrereg(is_prereg));

                    yield put(actions.signInReceiveSuccess(response));
                    yield put(actions.showHideSignIn(false));
                    window.location.href = user_type === Number(DRIVER_TYPE) ? "/calendar" : "/home";
                }
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
        const formData = new FormData();

        if (data.profile_photos) {
            formData.append("profile", data.profile);
            formData.append(`profile_photos[${data.profile_photos.name}]`, data.profile_photos);
        }

        const {response, error} = yield call(Api.updateProfileInfo, id, data.profile_photos ? formData : data);

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
    const {tip_type, lang} = action;

    try {
        const {response, error} = yield call(Api.getTips, tip_type, lang);

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
        const {lang} = action;
        const {response, error} = yield call(Api.getDestinations, lang);

        if (response) {
            yield put(actions.destinationReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* heroesRequest(action) {
    try {
        const {lang} = action;
        const {response, error} = yield call(Api.getHeroes, lang);

        if (response) {
            yield put(actions.heroesReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* tripsRequest(action) {
    try {
        const {body={}} = action;
        const {is_top_choice=false, offset=0,limit=12, lang="en"} = body;
        const {response, error} = yield call(Api.getTrips, localStorage.id || 0, is_top_choice,  Number(offset),Number(limit),lang);

        if (response) {
            yield put(actions.tripsReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* hitTheRoadRequest(action) {

    try {
        const {lang} = action;
        const {response, error} = yield call(Api.getHitTheRoad, lang);

        if (response) {
            yield put(actions.hitTheRoadReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* saveTrip(action) {
    const driverState = yield select(travelerDataState);

    const {is_save, trip_id} = action;
    const body = {
        is_save,
        trip_id,
        login_id: driverState.profile.id,
    };

    try {
        yield call(Api.saveTrip, body);
        yield put(actions.tripsRequest());
        yield put(actions.savedTripsRequest());
        yield put(actions.tripDetailRequest(trip_id));
    } catch (e) {
        console.log(" error ", e);
    }
}

function* savedTripsRequest(action) {
    const travelerState = yield select(travelerDataState);
    const login_id = travelerState.profile.id || Number(localStorage.id);

    try {
        const {response, error} = yield call(Api.getSavedTrips, login_id);

        if (response) {
            yield put(actions.savedTripsReceive(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* tripDetailRequest(action) {
    const {trip_id, lang} = action;

    try {
        const {response, error} = yield call(Api.getTripDetail, trip_id, localStorage.id || 0, lang);

        if (response) {
            yield put(actions.tripDetailReceive(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* driverInfosRequest(action) {

    try {
        const {response, error} = yield call(Api.driverInfosRequest, Number(localStorage.id));

        if (response) {
            yield put(actions.driverInfosReceive(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* deleteDriverInfosRequest(action) {
    const {body} = action;

    try {
        const {response, error} = yield call(Api.deleteDriverInfos, Number(localStorage.id), body);

        if (response) {
            yield put(actions.driverInfosRequest());
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* updateDriverInfosRequest(action) {
    const {body} = action;
    const formData = new FormData();

    const photos_key = ['car_photos', 'license_photos', 'reg_card_photos', 'gov_photos'];

    photos_key.forEach(key => {
        _.each(_.pick(body, key), (photos, name) => {
            photos.forEach(photo => {
                if (photo.id) {
                    formData.append(`${name}[${photo.name}]`, JSON.stringify(photo));
                } else {
                    formData.append(`${name}[${photo.name}]`, photo);
                }
            });
        });
    });

    formData.append("login_id", localStorage.id);
    if (body.car_info) {
        formData.append("car_info", JSON.stringify(body.car_info));
    }

    try {
        const {response, error} = yield call(Api.updateDriverInfos, Number(localStorage.id), formData);

        if (response) {
            yield put(actions.driverInfosRequest());
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* individualUserRequest(action) {
    const {id, user_type} = action;

    try {
        const {response, error} = yield call(Api.getIndividualUser, Number(id), user_type);

        if (response) {
            yield put(actions.individualUserReceive(response.data));
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

    const photos = _.pick(preregInfo, ["car_photos", "gov_photos", "license_photos", "profile_photos", "reg_card_photos"]); // get only photos
    const attributes = _.omit(preregInfo, ["car_photos", "gov_photos", "license_photos", "profile_photos", "reg_card_photos"]); // get only attributes without photos

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

    if (attributes['hit_the_road_tariff'] === undefined) {
        delete attributes['hit_the_road_tariff'];
    }

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
        yield put(actions.setUserType(DRIVER_TYPE));

        if (response) {
            setTimeout(() => {
                window.location.href = "/calendar";
                // delete localStorage.id;
                // delete localStorage.userType;
                delete localStorage.is_prereg;
            }, 300);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* getCalendarSettingsRequest(action) {
    try {
        const {driver_id} = action;
        const {response, error} = yield call(Api.getCalendarSettings, Number(driver_id));

        if (response) {
            yield put(actions.getCalendarSettingsReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* updateCalendarSettingsRequest(action) {
    try {
        const {driver_id, data} = action;
        const {response, error} = yield call(Api.updateCalendarSettings, Number(driver_id), data);

        if (response) {
            yield put(actions.getCalendarSettingsRequest(driver_id));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}


function* driversListRequest(action) {
    try {

        const {body} = action;
        const {date, travelers, price_range=[10, 1000], trip_id=0,offset=0,limit=5, lang='en'} = body;
        const {response, error} = yield call(Api.searchForDriver, date, Number(travelers), price_range, Number(trip_id), Number(offset),Number(limit), lang);

        if (response) {
            yield put(actions.searchForDriverReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* confirmTripBookingCheckout(action) {
    const {body} = action;

    try {
        const {response, error} = yield call(Api.confirmTripBookingCheckout, body);

        if (response) {
            console.log(response)
            setTimeout(() => {
                window.location.href = "/checkout/success";
            })
        } else {
            console.log(" err ", error.response);
            yield put(actions.tripBookingCheckoutReceiveError(error.response));
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* getBookedTripsRequest(action) {
    try {
        const {driver_id, user_type} = action;
        const {response, error} = yield call(Api.getBookedTrips, Number(driver_id), Number(user_type));
        if (response) {
            yield put(actions.getBookedTripsReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* getBookedTripRequest(action) {
    const {booked_id, user_type} = action;

    try {
        const {response, error} = yield call(Api.getBookedTrip, Number(booked_id), Number(user_type));
        if (response) {
            yield put(actions.getBookedTripReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* loadPricesListRequest(action) {
    try {
        const {is_trip=false} = action;
        const {response, error} = yield call(Api.loadPricesList, is_trip);
        if (response) {
            yield put(actions.loadPricesListReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* resendConfirmation(action) {
    try {
        const {email} = action;
        yield call(Api.resendConfirmation, email);

    } catch (e) {
        console.log(" error ", e);
    }
}
function* addTripReviewRequest(action) {
    try {
        const {body} = action;
        const {response, error} = yield call(Api.addTripReviewRequest, body);

        if (response) {
            yield put(actions.addTripReviewRecieve(response));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* addDriverReviewRequest(action) {
    try {
        const {body} = action;
        const {response, error} = yield call(Api.addDriverReviewRequest, body);

        if (response) {
            yield put(actions.addDriverReviewRecieve(response));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* driverProgressRequest(action) {
    try {
        const {driver_id} = action;
        const {response, error} = yield call(Api.driverProgressRequest, driver_id);

        if (response) {
            yield put(actions.driverProgressReceive(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* viewProgressDetails(action) {
    try {
        const {driver_id, section_type} = action;
        const {response, error} = yield call(Api.viewProgressDetailsRequest, driver_id, section_type);

        if (response) {
            yield put(actions.viewProgressDetailsRecieve(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* conversationsListRequest(action) {
    try {
        const {user_id, contact_name} = action;
        const {response, error} = yield call(Api.conversationsListRequest, user_id, contact_name);

        if (response) {
            yield put(actions.conversationsListRecieve(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* conversationRequest(action) {
    try {
        const {body} = action;
        const {response, error} = yield call(Api.conversationRequest, body);

        if (response) {
            yield put(actions.getConversationRecieve(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* viewConversationDetails(action) {
    try {
        const {conversation_id} = action;
        const {response, error} = yield call(Api.viewConversationDetailsRequest, conversation_id);

        if (response) {
            yield put(actions.viewConversationDetailsRecieve(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* sendMessageRequest(action) {
    try {
        const {conversation_id, body} = action;
        const {response, error} = yield call(Api.sendMessageRequest, conversation_id, body);

        if (response) {
            yield put(actions.sendMessageRecieve(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* getConversationMessages(action) {
    try {
        const {conversation_id, login_id} = action;
        const {response, error} = yield call(Api.getConversationMessagesRequest, conversation_id, login_id);

        if (response) {
            yield put(actions.getConversationMessagesRecieve(response.data));
        } else {
            console.log(" err ", error);
        }

    } catch (e) {
        console.log(" error ", e);
    }
}

function* deleteUserRequest(action) {
    try {
        const {body} = action;
        const {response, error} = yield call(Api.deleteUserRequest, body, localStorage.id || 0);

        if (response) {
            yield put(actions.deleteUserReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}

function* getHelpContentListRequest(action) {
    const {content_type, lang} = action;

    try {
        const {response, error} = yield call(Api.getHelpContentListRequest, content_type, lang);

        if (response) {
            yield put(actions.getHelpContentListReceive(response.data));
        } else {
            console.log(" err ", error);
        }
    } catch (e) {
        console.log(" error ", e);
    }
}


function* getIndividualContentRequest(action) {
    const {content_type, lang, id} = action;
    try {
        const {response, error} = yield call(Api.getIndividualContentRequest, content_type, lang, id);
        if (response) {
            yield put(actions.getIndividualContentReceive(response.data));
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
    yield takeEvery(actions.DELETE_USER_REQUEST, deleteUserRequest);
    yield takeEvery(actions.CAR_MARK_REQUEST, carMarkRequest);
    yield takeEvery(actions.CAR_MODEL_REQUEST, carModelRequest);
    yield takeEvery(actions.TIPS_REQUEST, tipsRequest);
    yield takeEvery(actions.DESTINATION_REQUEST, destinationRequest);
    yield takeEvery(actions.SAVE_DRIVER_PREREG_DATA, saveDriverPreregData);
    yield takeEvery(actions.HEROES_REQUEST, heroesRequest);
    yield takeEvery(actions.TRIPS_REQUEST, tripsRequest);
    yield takeEvery(actions.HIT_THE_ROAD_REQUEST, hitTheRoadRequest);
    yield takeEvery(actions.SAVE_TRIP, saveTrip); // favorite or not
    yield takeEvery(actions.SAVED_TRIPS_REQUEST, savedTripsRequest);
    yield takeEvery(actions.TRIP_DETAIL_REQUEST, tripDetailRequest);
    yield takeEvery(actions.DRIVER_PROGRESS_REQUEST, driverProgressRequest);
    yield takeEvery(actions.DRIVER_INFOS_REQUEST, driverInfosRequest);
    yield takeEvery(actions.DELETE_DRIVER_INFOS_REQUEST, deleteDriverInfosRequest);
    yield takeEvery(actions.UPDATE_DRIVER_INFOS_REQUEST, updateDriverInfosRequest);
    yield takeEvery(actions.INDIVIDUAL_USER_REQUEST, individualUserRequest);
    yield takeEvery(actions.CALENDAR_SETTINGS_REQUEST, getCalendarSettingsRequest);
    yield takeEvery(actions.UPDATE_CALENDAR_SETTINGS_REQUEST, updateCalendarSettingsRequest);
    yield takeEvery(actions.DRIVERS_LIST_REQUEST, driversListRequest);
    yield takeEvery(actions.CONFIRM_CHECKOUT_RECEIVE, confirmTripBookingCheckout);
    yield takeEvery(actions.BOOKED_TRIPS_REQUEST, getBookedTripsRequest);
    yield takeEvery(actions.BOOKED_TRIP_REQUEST, getBookedTripRequest);
    yield takeEvery(actions.PRICES_LIST_REQUEST, loadPricesListRequest);
    yield takeEvery(actions.RESEND_CONFIRMATION, resendConfirmation);
    yield takeEvery(actions.ADD_TRIP_REVIEW_REQUEST, addTripReviewRequest);
    yield takeEvery(actions.ADD_DRIVER_REVIEW_REQUEST, addDriverReviewRequest);
    yield takeEvery(actions.VIEW_PROGRESS_DETAILS_REQUEST, viewProgressDetails);
    yield takeEvery(actions.CONVERSATIONS_LIST_REQUEST, conversationsListRequest);
    yield takeEvery(actions.GET_CONVERSATION_REQUEST, conversationRequest);
    yield takeEvery(actions.VIEW_CONVERSATION_DETAILS_REQUEST, viewConversationDetails);
    yield takeEvery(actions.SEND_MESSAGE_REQUEST, sendMessageRequest);
    yield takeEvery(actions.GET_CONVERSATION_MESSAGES_REQUEST, getConversationMessages);
    yield takeEvery(actions.HELP_CONTENT_LIST_REQUEST, getHelpContentListRequest);
    yield takeEvery(actions.HELP_INDIVIDUAL_CONTENT_REQUEST, getIndividualContentRequest);
}

export default function* root() {
    yield all([
        fork(watcherSaga)
    ]);
}
