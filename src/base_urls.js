const HOST = "http://35.188.52.179/api";
//const HOST = "http://localhost:3000/api";

export default {
  "day_trip": {
    "sign_up": `${HOST}/sign_up`,
    "sign_in": `${HOST}/sign_in`,
    "getProfileInfo": `${HOST}/profile_info/{0}?profile={1}`,
    "updateProfileInfo": `${HOST}/profile_info/{0}`,
    "getCarMarks": `${HOST}/car_brands`,
    "getCarModels": `${HOST}/car_brands/{0}/models`,
    "getTips": `${HOST}/tips?type={0}`,
    "getDestinations": `${HOST}/destinations`,
    "saveDriverPreregData": `${HOST}/driver_infos`,
    "getHeroes": `${HOST}/heroes`,
    "getTrips": `${HOST}/trips?login_id={0}&is_top_choice={1}`,
    "getTripDetail": `${HOST}/trips/{0}?login_id={1}`,
    "getHitTheRoad": `${HOST}/hit_the_road`,
    "saveTrip": `${HOST}/save_trip`,
    "driverInfos": `${HOST}/driver_infos/{0}`,
    "getSavedTrips": `${HOST}/saved_trips?login_id={0}`,
  }
}
