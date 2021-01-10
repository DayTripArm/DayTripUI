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
    "getTrips": `${HOST}/trips?login_id={0}&is_top_choice={1}&offset={2}&limit={3}`,
    "searchTrips": `${HOST}/trips?query={0}`,
    "getTripDetail": `${HOST}/trips/{0}?login_id={1}`,
    "getHitTheRoad": `${HOST}/hit_the_road`,
    "saveTrip": `${HOST}/save_trip`,
    "driverInfos": `${HOST}/driver_infos/{0}`,
    "driverProgress": `${HOST}/driver_progress?id={0}`,
    "driverProgressDetails": `${HOST}/view_driver_progress?id={0}&section_type={1}`,
    "getSavedTrips": `${HOST}/saved_trips?login_id={0}`,
    "getCountryCities": `${HOST}/country_cities?city={0}`,
    "getIndividualUser": `${HOST}/profile_info/{0}?profile=user_profile&user_type={1}`,
    "getCalendarSettings": `${HOST}/calendar_settings/{0}`,
    "updateCalendarSettings": `${HOST}/calendar_settings/{0}`,
    "searchForDriver": `${HOST}/search_drivers?date={0}&travelers={1}&price_range={2}&trip_id={3}&offset={4}&limit={5}`,
    "loadPricesList": `${HOST}/price_list?is_trip={0}`,
    "addTripReview": `${HOST}/trip_review`,
    "addDriverReview": `${HOST}/driver_review`,
    "confirmTripBookingCheckout": `${HOST}/booked_trips`,
    "getBookedTrips": `${HOST}/booked_trips?user_id={0}&utype={1}`,
    "getBookedTrip": `${HOST}/booked_trips/{0}?utype={1}`,
    "resendConfirmation": `${HOST}/resend_confirmation?email={0}`,
  }
}
