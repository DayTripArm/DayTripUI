const HOST = "http://35.188.52.179/api";
//const HOST = "http://localhost:3000/api";

export default {
  "day_trip": {
    "sign_up": `${HOST}/sign_up`,
    "sign_in": `${HOST}/sign_in`,
    "getProfileInfo": `${HOST}/profile_info`,
    "getCarMarks": `${HOST}/car_brands`,
    "getCarModels": `${HOST}/car_brands/{0}/models`,
  }
}