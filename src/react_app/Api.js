import axios from "axios";
import base_urls from "../base_urls";

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
        return axios.get(base_urls.day_trip.getProfileInfo+`/${id}?profile=personal`, { handlesError: [400, 417, 500] })
            .then(response => ({response}) )
            .catch(error => ({error}) );
    },
}