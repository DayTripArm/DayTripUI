import axios from "axios";
import base_urls from "./base_urls";
import template from "string-template";

export default {
    signUpRequest(body) {
        return axios.post(base_urls.day_trip.sign_up, body, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    signInRequest(body) {
        return axios.post(base_urls.day_trip.sign_in, body, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getProfileInfo(id) {
        return axios.get(template(base_urls.day_trip.getProfileInfo, id, "personal"), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    updateProfileInfo(id, data) {
        return axios.post(template(base_urls.day_trip.updateProfileInfo, id), data, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getCarMarks() {
        return axios.get(base_urls.day_trip.getCarMarks, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getCarModels(mark_id) {
        return axios.get(template(base_urls.day_trip.getCarModels, mark_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getTips(type) {
        return axios.get(template(base_urls.day_trip.getTips, type), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getDestinations() {
        return axios.get(base_urls.day_trip.getDestinations, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getHeroes() {
        return axios.get(base_urls.day_trip.getHeroes, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getTrips(login_id, is_top_choice, offset, limit) {
        return axios.get(template(base_urls.day_trip.getTrips, login_id, is_top_choice, offset, limit), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    searchTrips(query) {
        return axios.get(template(base_urls.day_trip.searchTrips, query), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getHitTheRoad() {
        return axios.get(base_urls.day_trip.getHitTheRoad, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    saveTrip(data) {
        return axios.post(base_urls.day_trip.saveTrip, data, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getSavedTrips(login_id) {
        return axios.get(template(base_urls.day_trip.getSavedTrips, login_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getTripDetail(trip_id, login_id) {
        return axios.get(template(base_urls.day_trip.getTripDetail, trip_id, login_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    driverInfosRequest(login_id) {
        return axios.get(template(base_urls.day_trip.driverInfos, login_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    deleteDriverInfos(login_id, body) {
        return axios.delete(template(base_urls.day_trip.driverInfos, login_id), { handlesError: [400, 417, 500], data: body })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    updateDriverInfos(login_id, body) {
        return axios.put(template(base_urls.day_trip.driverInfos, login_id), body, { handlesError: [400, 417, 500], headers: { 'content-type': 'multipart/form-data' }})
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    saveDriverPreregData(data) {
        return axios.post(base_urls.day_trip.saveDriverPreregData, data,{ handlesError: [400, 417, 500], headers: { 'content-type': 'multipart/form-data' } })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getCountryCities(city="") {
        return axios.get(template(base_urls.day_trip.getCountryCities, city), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getIndividualUser(id, user_type) {
        return axios.get(template(base_urls.day_trip.getIndividualUser, id, user_type), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getCalendarSettings(driver_id) {
        return axios.get(template(base_urls.day_trip.getCalendarSettings, driver_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    updateCalendarSettings(driver_id, data) {
        return axios.post(template(base_urls.day_trip.updateCalendarSettings, driver_id), data,{ handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    searchForDriver(date, travelers, price_range, trip_id, offset, limit) {
        return axios.get(template(base_urls.day_trip.searchForDriver, date, travelers, price_range, trip_id,offset,limit), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },
    confirmTripBookingCheckout(body) {
        return axios.post(base_urls.day_trip.confirmTripBookingCheckout, body,{ handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getBookedTrips(driver_id, user_type) {
        return axios.get(template(base_urls.day_trip.getBookedTrips, driver_id, user_type), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getBookedTrip(booked_id, user_type) {
        return axios.get(template(base_urls.day_trip.getBookedTrip, booked_id, user_type), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    loadPricesList(is_trip){
        return axios.get(template(base_urls.day_trip.loadPricesList, is_trip), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    resendConfirmation(email){
        return axios.get(template(base_urls.day_trip.resendConfirmation, email), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    addTripReviewRequest(body) {
        return axios.post(template(base_urls.day_trip.addTripReview), body, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    addDriverReviewRequest(body) {
        return axios.post(template(base_urls.day_trip.addDriverReview), body, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    driverProgressRequest(driver_id) {
        return axios.get(template(base_urls.day_trip.driverProgress, driver_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    viewProgressDetailsRequest(driver_id, section_type) {
        return axios.get(template(base_urls.day_trip.driverProgressDetails, driver_id, section_type), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },
    conversationsListRequest(user_id) {
        return axios.get(template(base_urls.day_trip.loadConversations, user_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },
    conversationRequest(body) {
        return axios.post(template(base_urls.day_trip.getConversation), body, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    viewConversationDetailsRequest(conversation_id) {
        return axios.get(template(base_urls.day_trip.viewConversation, conversation_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    sendMessageRequest(conversation_id, body) {
        return axios.post(template(base_urls.day_trip.createMessage, conversation_id), body, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },

    getConversationMessagesRequest(conversation_id) {
        return axios.get(template(base_urls.day_trip.getConversationMessages, conversation_id), { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },
}
