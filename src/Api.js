import axios from "axios";
import base_urls from "./base_urls";

export default {
    async signUp(requestParams) {
        return axios.post(base_urls.day_trip.sign_up, requestParams)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    }
};